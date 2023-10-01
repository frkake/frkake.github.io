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
            month = convertMonthToNumber(monthMatch[1]);
        } else if (eprintMatch) {
            year = "20" + eprintMatch[1].substring(0, 2);  // "1312" -> "2013"
            month = eprintMatch[1].substring(2, 4);  // "1312" -> "12"
        } else if (yearMatch && !monthMatch) {
            year = yearMatch[1];
            month = '';
        }
        
        // リスト形式で書誌情報を整頓
        let markdownText = '<ul class="cite-list">';
        markdownText += formatListItem("著者", authorMatch ? authorMatch[1] : '');
        markdownText += formatListItem("タイトル", titleMatch ? titleMatch[1] : '');
        markdownText += formatListItem("会議", booktitle);
        markdownText += formatListItem("出版年月日", `${year ? year : ''}-${month ? month : ''}`);
        markdownText += '</ul>';
        
        markdownCite.innerHTML = markdownText;
    });
});

function convertMonthToNumber(monthStr) {
    const monthMap = {
        'January': '01', 'Jan': '01',
        'February': '02', 'Feb': '02',
        'March': '03', 'Mar': '03',
        'April': '04', 'Apr': '04',
        'May': '05',
        'June': '06', 'Jun': '06',
        'July': '07', 'Jul': '07',
        'August': '08', 'Aug': '08',
        'September': '09', 'Sep': '09',
        'October': '10', 'Oct': '10',
        'November': '11', 'Nov': '11',
        'December': '12', 'Dec': '12'
    };
    return monthMap[monthStr] || monthStr;  // 未知の月はそのまま返す
}

function formatListItem(title, content) {
    return `<li><strong class="cite-title">${title}：</strong><span class="cite-content">${content}</span></li>`;
}