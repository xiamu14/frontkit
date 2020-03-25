module.exports = async function wait(second) {
    return new Promise((resolve) =>{ 
        const timer = setTimeout(() => {
            resolve();
            clearTimeout(timer);
        }, second);
    });
  };
