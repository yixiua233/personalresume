const commentForm = document.getElementById('comment-form');
const commentsDiv = document.getElementById('comments');
let commentId = 0; // 用于生成唯一 ID

// 控制弹窗
const ratingModal = document.getElementById('rating-modal');
const overlay = document.getElementById('overlay');
const closeModal = document.getElementById('close-modal');
let contentRating = 0;
let designRating = 0;

// 处理表单提交
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // 创建留言元素
    const comment = document.createElement('div');
    comment.className = 'comment';
    commentId++; // 生成唯一的留言ID
    comment.innerHTML = `
        <strong>${name} (${email}) ID: ${commentId}</strong>
        <p>${message}</p>
        <button class="reply-btn">回复</button>
        <div class="reply-section" style="display:none;">
            <textarea placeholder="输入回复..." rows="2" style="width: 100%;"></textarea>
            <button class="send-reply-btn">发送回复</button>
        </div>
        <div class="replies"></div>
    `;

    // 将留言添加到留言列表中
    commentsDiv.appendChild(comment);

    // 清空表单
    commentForm.reset();

    // 显示评分弹窗
    ratingModal.style.display = 'block';
    overlay.style.display = 'block';

    // 处理闭合弹窗
    closeModal.addEventListener('click', function() {
        ratingModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 处理内容评分
    const contentStars = document.querySelectorAll('#content-rating-area .star');
    contentStars.forEach(star => {
        star.addEventListener('click', function() {
            contentRating = this.getAttribute('data-value');
            contentStars.forEach(s => s.classList.remove('hover'));
            for (let i = 0; i < contentRating; i++) {
                contentStars[i].classList.add('hover'); // 填充星星
            }
            document.getElementById('content-rating').innerText = `内容评分：${contentRating}`;
        });

        star.addEventListener('mouseover', function() {
            contentStars.forEach(s => s.classList.remove('hover'));
            for (let i = 0; i < this.getAttribute('data-value'); i++) {
                contentStars[i].classList.add('hover');
            }
        });

        star.addEventListener('mouseout', function() {
            contentStars.forEach(s => s.classList.remove('hover'));
            if (contentRating) {
                for (let i = 0; i < contentRating; i++) {
                    contentStars[i].classList.add('hover');
                }
            }
        });
    });

    // 处理设计评分
    const designStars = document.querySelectorAll('#design-rating-area .star');
    designStars.forEach(star => {
        star.addEventListener('click', function() {
            designRating = this.getAttribute('data-value');
            designStars.forEach(s => s.classList.remove('hover'));
            for (let i = 0; i < designRating; i++) {
                designStars[i].classList.add('hover'); // 填充星星
            }
            document.getElementById('design-rating').innerText = `设计评分：${designRating}`;
        });

        star.addEventListener('mouseover', function() {
            designStars.forEach(s => s.classList.remove('hover'));
            for (let i = 0; i < this.getAttribute('data-value'); i++) {
                designStars[i].classList.add('hover');
            }
        });

        star.addEventListener('mouseout', function() {
            designStars.forEach(s => s.classList.remove('hover'));
            if (designRating) {
                for (let i = 0; i < designRating; i++) {
                    designStars[i].classList.add('hover');
                }
            }
        });
    });

    // 清空评分输入
    contentRating = 0;
    designRating = 0;
    document.getElementById('content-rating').innerText = '';
    document.getElementById('design-rating').innerText = '';
});
