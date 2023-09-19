// static/js/cite.js
document.addEventListener("DOMContentLoaded", function() {
    // 現在のモードを取得（PaperModテーマに依存する場合があります）
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const citeBlocks = document.querySelectorAll('.cite-block');
    citeBlocks.forEach((block) => {
        // モードに応じてクラスを設定
        block.classList.add(isDarkMode ? 'dark' : 'light');

        const bibtex = block.querySelector('.bibtex').textContent.trim();
        const markdownCite = block.querySelector('.markdown-cite');
        
        // BibTeXを解析してMarkdown形式に変換（簡易的な例）
        const titleMatch = bibtex.match(/title\s*=\s*{([^}]+)}/);
        const booktitleMatch = bibtex.match(/booktitle\s*=\s*{([^}]+)}/);
        const yearMatch = bibtex.match(/year\s*=\s*{([^}]+)}/);
        const monthMatch = bibtex.match(/month\s*=\s*{([^}]+)}/);
        const eprintMatch = bibtex.match(/eprint\s*=\s*{([^}]+)}/);
        const authorMatch = bibtex.match(/author\s*=\s*{([^}]+)}/);
        const archivePrefixMatch = bibtex.match(/archivePrefix\s*=\s*{([^}]+)}/);

        let booktitle;
        if (booktitleMatch) {
            booktitle = booktitleMatch[1];
        } else if (archivePrefixMatch && archivePrefixMatch[1] === 'arXiv') {
            booktitle = 'arXiv';
        } else {
            booktitle = '';
        }

        let year, month;
        if (yearMatch && monthMatch) {
            year = yearMatch[1];
            month = monthMatch[1];
        } else if (eprintMatch) {
            year = "20" + eprintMatch[1].substring(0, 2);  // "1312" -> "2013"
            month = eprintMatch[1].substring(2, 4);  // "1312" -> "12"
        }
        
        // リスト形式で書誌情報を整頓
        let markdownText = '<ul>';
        markdownText += `<li><strong>著者：</strong>${authorMatch ? authorMatch[1] : ''}</li>`;
        markdownText += `<li><strong>タイトル：</strong>${titleMatch ? titleMatch[1] : ''}</li>`;
        markdownText += `<li><strong>会議：</strong>${booktitle}</li>`;
        markdownText += `<li><strong>出版年月日：</strong>${year ? year : ''}-${month ? month : ''}</li>`;
        markdownText += '</ul>';
        
        markdownCite.innerHTML = markdownText;
    });
});
