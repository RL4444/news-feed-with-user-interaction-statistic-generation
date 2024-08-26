import request from 'request-promise'
import { load } from 'cheerio'
import moment from 'moment'
import fs from 'fs'
import { readdir } from 'node:fs/promises'

const todaysDateFormatted = moment().format('DD-MM-yyyy_HH')

const getMusicHeadlines = async () => {
  const url = 'https://www.bbc.com/culture/music'
  const html = await request.get(url)
  const $ = load(html)
  const bodyNodes = $('body')
  const newsNodes = $(bodyNodes).find('[data-testid="alaska-grid"]')

  const data = []
  $(newsNodes)
    .find('[data-testid="liverpool-card"]')
    .each((index, item) => {
      const id = `bbc-${$(item).find('a').attr('href').replace('/news/articles/', '')}`
      const title = $(item).find('h2').text()
      const description = $(item).find('p').text()
      const url = `https://bbc.com${$(item).find('a').attr('href')}`
      const downloadedAt = moment().format('DD-MM-yyyy')
      let imgSrc = $(item).find('img').next().attr('src')
      let imgSrcSet = $(item).find('img').next().attr('srcset')
      const tag = 'entertainment, music, celeb gossip'

      if (!imgSrcSet) {
        imgSrc = $(item).find('img').attr('src')
        imgSrcSet = $(item).find('img').attr('srcset')
      }

      data.push({
        id,
        title,
        description,
        url,
        imgSrc,
        imgSrcSet,
        downloadedAt,
        tag
      })
    })

  fs.writeFileSync(`./data-gen/bbc-music-${todaysDateFormatted}.json`, JSON.stringify({ data }))
}

const getEntertainmentHeadlines = async () => {
  const url = 'https://www.bbc.com/culture/film-tv'
  const html = await request.get(url)
  const $ = load(html)
  const bodyNodes = $('body')
  // fs.writeFileSync('./data-gen/raw.html', `${bodyNodes}`)
  const newsNodes = $(bodyNodes).find('[data-testid="alaska-grid"]')

  const data = []
  $(newsNodes)
    .find('[data-testid="liverpool-card"]')
    .each((index, item) => {
      const id = `bbc-${$(item).find('a').attr('href').replace('/news/articles/', '')}`
      const title = $(item).find('h2').text()
      const description = $(item).find('p').text()
      const url = `https://bbc.com${$(item).find('a').attr('href')}`
      const downloadedAt = moment().format('DD-MM-yyyy')
      let imgSrc = $(item).find('img').next().attr('src')
      let imgSrcSet = $(item).find('img').next().attr('srcset')
      const tag = 'entertainment, tv & film, celeb gossip'

      if (!imgSrcSet) {
        console.log('does this fire?? ')
        imgSrc = $(item).find('img').attr('src')
        imgSrcSet = $(item).find('img').attr('srcset')
      }

      data.push({
        id,
        title,
        description,
        url,
        imgSrc,
        imgSrcSet,
        downloadedAt,
        tag
      })
    })

  fs.writeFileSync(`./data-gen/bbc-film-tv-${todaysDateFormatted}.json`, JSON.stringify({ data }))
}

const getSportHeadlines = async () => {
  const url = 'https://www.bbc.com/sport'
  const html = await request.get(url)
  const $ = load(html, { xml: true })
  const bodyNodes = $('body')
  const newsNodes = $(bodyNodes).find('[type="article"]')
  fs.writeFileSync('./data-gen/raw.html', `${newsNodes}`)

  const data = []
  $(newsNodes).each((index, item) => {
    const id = `bbc${$(item).find('a').attr('href').replace(/\//g, '-')}`
    const title = $(item).find('a').first('p').text()
    const description = $(item).find('a > p').text()
    const downloadedAt = moment().format('DD-MM-yyyy')
    const url = `https://bbc.com${$(item).find('a').attr('href')}`
    let imgSrc = $(item).find('img').attr('src')
    let imgSrcSet = $(item).find('img').attr('srscset')
    const tag = `sport${id.includes('olympics') ? ', olympics' : ''}${id.includes('football') ? ', football' : ''}`

    if (!imgSrc) {
      imgSrc = $(item).find('source').attr('src')
    }

    if (!imgSrcSet) {
      imgSrcSet = $(item).find('source').attr('srcSet')
    }
    if (!imgSrcSet) {
      imgSrcSet = $(item).find('img').next().attr('srcSet')
    }

    data.push({
      id,
      title,
      description,
      url,
      imgSrc,
      imgSrcSet,
      downloadedAt,
      tag
    })
  })

  fs.writeFileSync(`./data-gen/bbc-sport-${todaysDateFormatted}.json`, JSON.stringify({ data }))
}

const getCurrentHeadlines = async () => {
  const url = 'https://www.bbc.com/news/world/europe'
  const html = await request.get(url)
  const $ = load(html)
  const bodyNodes = $('body')
  const newsNodes = $(bodyNodes).find('[data-testid="alaska-section-outer"]')

  const data = []
  $(newsNodes)
    .find('[data-testid=liverpool-card]')
    .each((index, item) => {
      const id = `bbc-${$(item).find('a').attr('href').replace('/news/articles/', '')}`
      const title = $(item).find('h2').text()
      const description = $(item).find('p').text()
      const url = `https://bbc.com${$(item).find('a').attr('href')}`
      const imgSrc = $(item).find('img').next().attr('src')
      const imgSrcSet = $(item).find('img').next().attr('srcset')
      const tag = 'breaking news'
      const downloadedAt = moment().format('DD-MM-yyyy')

      data.push({
        id,
        title,
        description,
        url,
        imgSrc,
        imgSrcSet,
        downloadedAt,
        tag
      })
    })
  fs.writeFileSync(`./data-gen/bbc-news-${todaysDateFormatted}.json`, JSON.stringify({ data }))
}

const sortDataForClient = async () => {
  const files = await readdir('./data-gen', { recursive: true })

  const sport = []
  const news = []
  const filmTv = []
  const music = []

  for (const newsFile of files) {
    if (newsFile.includes('sport') && newsFile.includes('.json')) {
      const imported = JSON.parse(fs.readFileSync(`./data-gen/${newsFile}`))
      sport.push(imported.data)
    }
    if (newsFile.includes('news') && newsFile.includes('.json')) {
      const imported = JSON.parse(fs.readFileSync(`./data-gen/${newsFile}`))
      news.push(imported.data)
    }
    if (newsFile.includes('film-tv') && newsFile.includes('.json')) {
      const imported = JSON.parse(fs.readFileSync(`./data-gen/${newsFile}`))
      filmTv.push(imported.data)
    }
    if (newsFile.includes('music') && newsFile.includes('.json')) {
      const imported = JSON.parse(fs.readFileSync(`./data-gen/${newsFile}`))
      music.push(imported.data)
    }
  }

  const removeDupes = (rawArray) => {
    const filteredItems = []
    rawArray.filter((eachItem) => {
      if (!filteredItems.some((itemToCheck) => itemToCheck.id === eachItem.id)) {
        filteredItems.push(eachItem)
      }
    })

    return filteredItems
  }

  fs.writeFileSync(
    `./src/__data/bbc-music.json`,
    JSON.stringify({ data: removeDupes(music.flat().reverse()), count: music.flat().length })
  )
  fs.writeFileSync(
    `./src/__data/bbc-news.json`,
    JSON.stringify({ data: removeDupes(news.flat().reverse()), count: news.flat().length })
  )
  fs.writeFileSync(
    `./src/__data/bbc-tv-film.json`,
    JSON.stringify({ data: removeDupes(filmTv.flat().reverse()), count: filmTv.flat().length })
  )
  fs.writeFileSync(
    `./src/__data/bbc-sport.json`,
    JSON.stringify({ data: removeDupes(sport.flat().reverse()), count: sport.flat().length })
  )
}

const main = async () => {
  await getCurrentHeadlines()
  await getSportHeadlines()
  await getEntertainmentHeadlines()
  await getMusicHeadlines()

  await sortDataForClient()
}

main()
