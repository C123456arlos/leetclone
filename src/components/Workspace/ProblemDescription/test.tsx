await runTransaction(firestore, async (transaction) => {
    const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

    if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
            // remove problem id from likedProblems on user document, decrement likes on problem document
            transaction.update(userRef, {
                likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
            });
            transaction.update(problemRef, {
                likes: problemDoc.data().likes - 1,
            });

            setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
            setData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
            transaction.update(userRef, {
                likedProblems: [...userDoc.data().likedProblems, problem.id],
                dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
            });
            transaction.update(problemRef, {
                likes: problemDoc.data().likes + 1,
                dislikes: problemDoc.data().dislikes - 1,
            });

            setCurrentProblem((prev) =>
                prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
            );
            setData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
            transaction.update(userRef, {
                likedProblems: [...userDoc.data().likedProblems, problem.id],
            });
            transaction.update(problemRef, {
                likes: problemDoc.data().likes + 1,
            });
            setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
            setData((prev) => ({ ...prev, liked: true }));
        }
    }
});

setUpdating(false)
    }
const handleDislike = async () => {
    if (!user) {
        toast.error('you must log in to dislike a problem', { position: 'top-left', theme: 'dark' })
        return
    }
    if (updating) return
    setUpdating(true)
    await runTransaction(firestore, async (transaction) => {
        const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
        if (userDoc.exists() && problemDoc.exists()) {
            // already disliked, already liked, not disliked or liked
            if (disliked) {
                transaction.update(userRef, {
                    dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes - 1,
                });
                setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
                setData((prev) => ({ ...prev, disliked: false }));
            } else if (liked) {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                    likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes + 1,
                    likes: problemDoc.data().likes - 1,
                });
                setCurrentProblem((prev) =>
                    prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
                );
                setData((prev) => ({ ...prev, disliked: true, liked: false }));
            } else {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes + 1,
                });
                setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
                setData((prev) => ({ ...prev, disliked: true }));
            }
        }
    });