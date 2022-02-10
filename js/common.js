// incline, normal, decline
export const colours = (dataType) => {
    switch (dataType) {
        case dataTypes.water:
            return ['', '', '', ''];
        case dataTypes.grass:
            return ['#ffffff', '#ffffff', '#ffffff'];
        case dataTypes.dirt:
            return ['#ffffff', '#ffffff', '#ffffff'];
        case dataTypes.stone:
            return ['#888888', '#666666', '#222222'];
        case dataTypes.sand:
            return ['#ffffff', '#ffffff', '#ffffff'];
        case dataTypes.snow:
            return ['#ffffff', '#ffffff', '#ffffff'];
        case dataTypes.air:
        default:
            return ['#ffffff'];
    }
}

export const dataTypes = {
    air: 0,
    water: 1,
    grass: 2,
    dirt: 3,
    stone: 4,
    sand: 5,
    snow: 6,
}

export const directions = {
    left: -1,
    right: 1,
    up: -1,
    down: 1,
    none: 0,
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;