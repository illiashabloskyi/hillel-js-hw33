document.addEventListener("DOMContentLoaded", () => {
  const postIdInput = document.getElementById("postIdInput");
  const searchButton = document.getElementById("searchButton");
  const postContainer = document.getElementById("postContainer");
  const commentsContainer = document.getElementById("commentsContainer");

  searchButton.addEventListener("click", () => {
      const postId = parseInt(postIdInput.value);
      if (isNaN(postId) || postId < 1 || postId > 100) {
          alert("Введіть коректний ID поста (від 1 до 100)");
          return;
      }

      // Очищаємо попередні результати
      postContainer.innerHTML = "";
      commentsContainer.innerHTML = "";

      // Виконуємо запит до API
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Не вдалося отримати пост");
              }
              return response.json();
          })
          .then((post) => {
              // Виводимо знайдений пост
              const postElement = document.createElement("div");
              postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
              postContainer.appendChild(postElement);

              // Отримуємо коментарі до поста
              return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Не вдалося отримати коментарі");
              }
              return response.json();
          })
          .then((comments) => {
              // Виводимо коментарі
              if (comments.length > 0) {
                  const commentsList = document.createElement("ul");
                  comments.forEach((comment) => {
                      const commentItem = document.createElement("li");
                      commentItem.textContent = comment.body;
                      commentsList.appendChild(commentItem);
                  });
                  commentsContainer.appendChild(commentsList);
              } else {
                  commentsContainer.innerHTML = "<p>Коментарі відсутні</p>";
              }
          })
          .catch((error) => {
              alert(`Помилка: ${error.message}`);
          });
  });
});
