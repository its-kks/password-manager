const login = (req, res) => {
    console.log('Functioning');
    res.sendFile(path.join('./client/public', 'index.html'));
}

module.exports = {
    login
}