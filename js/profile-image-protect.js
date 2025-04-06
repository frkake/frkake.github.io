document.addEventListener('DOMContentLoaded', function() {
  const profileImages = document.querySelectorAll('.profile-image');
  
  // 画像に対して右クリックを無効化
  profileImages.forEach(img => {
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // ドラッグ操作を無効化
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    // タッチデバイス用のコピー防止
    img.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    });
    
    // キーボードショートカットの無効化（Ctrl+C, Command+C など）
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && 
          (e.key === 'c' || e.key === 's' || e.key === 'u' || e.key === 'p')) {
        if (window.getSelection && window.getSelection().toString() === '') {
          e.preventDefault();
          return false;
        }
      }
    });
  });
  
  // 画像コンテナ周りの保護
  const profileImageContainers = document.querySelectorAll('.profile-image-container');
  profileImageContainers.forEach(container => {
    container.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
  });
}); 