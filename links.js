const navigateToWesternWager = function() {
    location.href = 'https://westernwager.com';
}

const navigateToCrossFP = function() {
    location.href = 'https://crossfp.com';
}

const navigateToTreeGenerator = function() {
    location.href = './treegen/index.html';
}

document.getElementById('treeGenerator').addEventListener('click', navigateToTreeGenerator);
document.getElementById('westernWager').addEventListener('click', navigateToWesternWager);
document.getElementById('crossFP').addEventListener('click', navigateToCrossFP);