// incline, normal, decline
export const colours = (dataType) => {
    switch (dataType) {
        case dataTypes.water:
            return ['', '', '', ''];
        case dataTypes.grass:
            return ['', '', ''];
        case dataTypes.dirt:
            return ['', '', ''];
        case dataTypes.stone:
            return ['', '', ''];
        case dataTypes.sand:
            return ['', '', ''];
        case dataTypes.snow:
            return ['', '', ''];
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