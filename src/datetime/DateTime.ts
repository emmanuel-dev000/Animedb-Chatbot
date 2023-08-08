
export function Now() : string {
    return `${ Month() } ${ Day() }, ${ Year() } at ${ Time() }`;
}

export function Time() : string {
    const date = new Date();
    return `${ date.getHours() }:${ date.getMinutes() }`;
}

export function Day() : number {
    return new Date().getDate();
}

export function Year() : number {
    return new Date().getFullYear();
}

export function Month() : string {
    const date = new Date();

    // Zero-based counter. Not really good in design perspective.
    const monthInNumber = date.getMonth() + 1;

    let month = "";
    switch(monthInNumber) {
        case 1: {
            month = "January";
            break;
        }
        case 2: {
            month = "February";
            break;
        }
        case 3: {
            month = "March";
            break;
        }
        case 4: {
            month = "April";
            break;
        }
        case 5: {
            month = "May";
            break;
        }
        case 6: {
            month = "June";
            break;
        }
        case 7: {
            month = "July";
            break;
        }
        case 8: {
            month = "August";
            break;
        }
        case 9: {
            month = "September";
            break;
        }
        case 10: {
            month = "October";
            break;
        }
        case 11: {
            month = "November";
            break;
        }
        case 12: {
            month = "December";
            break;
        }
    }

    return month;
}