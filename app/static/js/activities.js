document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".clickable-row").forEach(row => {
        row.addEventListener("click", () => {
            const id = row.getAttribute("data-id");
            window.location.href = `/activity/${id}`;
        });
    });
});