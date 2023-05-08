const createdAt = (post) => {
    const data = new Date(post.createdAt).toString().split(" ").slice(0, 5);
    const date = new Date().toString().split(" ").slice(0, 5);

    const year = data.slice(0, 4).every((e, i) => {
        if (e === date[i]) {
            return true;
        } else {
            return false;
        }
    });
    let timeCheck = false;
    const foo = date[4].split(":");
    const da = data[4].split(":");

    const time = foo.map((e, i) => {
        return +e - +da[i];
    });

    if (time[0] === 0 && time[1] === 0) {
        timeCheck = 0;
    }
    if (time[0] === 0 && time[1] < 30) {
        timeCheck = time[1];
    }
    if (timeCheck === 0) {
        return "Hozirgina qoyilgan post";
    }
    if (timeCheck && year) {
        return timeCheck + " daqiqa avval qoyilgan post";
    }
    return data.join(" ");
};
export default createdAt