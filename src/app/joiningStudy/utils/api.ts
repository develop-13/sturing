export const postTodo = async (
  studyId: string,
  userEmail: string,
  todo: { todoId: string; content: string; done: boolean }
) => {
  try {
    const response = await fetch(`/joiningStudy/${studyId}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studyId,
        userEmail,
        todo, // todo object (text, done)
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add todo.");
    }
    const data = await response.json();
    console.log("Todo added:", data);
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const patchTodo = async (
  studyId: string,
  userEmail: string,
  todoId: string,
  done: boolean
) => {
  try {
    const response = await fetch(`/joiningStudy/${studyId}/api`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studyId,
        userEmail,
        todoId,
        done, // done status to update
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error("Failed to update todo.");
    }

    console.log("Todo updated:", data);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (
  studyId: string,
  userEmail: string,
  todoId: string
) => {
  try {
    const response = await fetch(`/joiningStudy/${studyId}/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studyId,
        userEmail,
        todoId, // todoId to delete
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo.");
    }

    const data = await response.json();
    console.log("Todo deleted:", data);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
