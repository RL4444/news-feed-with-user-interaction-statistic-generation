import music from '../__data/bbc-music.json'
import news from '../__data/bbc-news.json'
import sport from '../__data/bbc-sport.json'
import tvFilm from '../__data/bbc-tv-film.json'

type IUserState = {
    fav_stories: Array<string>;
    weight_metrics: {
        "breaking news": number,
        football: number,
        sport: number,
        olymics: number,
        entertainment: number,
        music: number,
        "celeb gossip": number,
        "tv & film": number,
    }
    //  so we only count the fav once
    fav_checked: Array<string>
}

const DEFAULT_USER_PREFERENCES = {
    fav_stories: [],
    weight_metrics: {
        "breaking news": 1,
        football: 1,
        sport: 1,
        olymics: 1,
        entertainment: 1,
        music: 1,
        "celeb gossip": 1,
        "tv & film": 1,
    },
    fav_checked: []
}

export const getCurrentState = () => {
    const state = JSON.parse(localStorage.getItem('news_state')!) || DEFAULT_USER_PREFERENCES
    localStorage.setItem('news_state', JSON.stringify(state))
    return state
}

export const updateWeightMetrics = (newState: IUserState) => {
    const allNews = [...music.data, ...news.data, ...sport.data, ...tvFilm.data].flat();
    const uncheckedIds = newState.fav_stories.filter(eachId => newState.fav_checked.indexOf(eachId) < 0);

    for (const id of uncheckedIds) {
        const tagsRaw = allNews.find(eachNewsItem => id === eachNewsItem.id)?.tag!
        let tags: Array<string>
        if (tagsRaw.includes(',')) {
            tags = tagsRaw.split(',')
            tags = tags.map(raw => raw.trim())
        } else {
            tags = [tagsRaw.trim()]
        }

        for (const tag of tags) {
            newState.weight_metrics[tag as keyof typeof DEFAULT_USER_PREFERENCES.weight_metrics] = newState.weight_metrics[tag as keyof typeof DEFAULT_USER_PREFERENCES.weight_metrics] + 1
        }
    }

    newState.fav_checked = newState.fav_stories;
    localStorage.setItem('news_state', JSON.stringify(newState));
    return newState
}

export const updateState = (newState: any) => {
    const processedState = updateWeightMetrics(newState)
    localStorage.setItem('news_state', JSON.stringify(processedState))
    return newState
}