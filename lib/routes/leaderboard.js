import { LeaderboardType, Platform, GroupTypeConverted, GroupType, TimeWindow } from 'fortnite-client'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const throwBadRequest = (message, values, response) => {
  response.status(400).jsonp({
    'statusCode': 400,
    'message': message,
    'availablesValues': values
  })
}

export default (router, api) => {
  router.get('/leaderboard/:type/:platform/:group', (req, res) => {
    if (!Object.values(LeaderboardType).includes(req.params.type)) {
      return throwBadRequest('Invalid `leaderboard type` value', Object.values(LeaderboardType), res)
    }

    if (!Object.values(Platform).includes(req.params.platform)) {
      return throwBadRequest('Invalid `platform` value', Object.values(Platform), res)
    }

    if (!Object.values(GroupTypeConverted).includes(req.params.group)) {
      return throwBadRequest('Invalid `group type` value', Object.values(GroupTypeConverted), res)
    }

    if (req.query.period && !Object.values(TimeWindow).includes(req.query.period)) {
      return throwBadRequest('Invalid `period` value', Object.values(TimeWindow), res)
    }
    const group = GroupType[capitalizeFirstLetter(req.params.group)]
    api.getLeaderboards(req.params.type, req.params.platform, group, req.query.period || 'alltime', req.query.page || 0, req.query.limit || 50)
      .then(leaderboards => {
        res.jsonp(leaderboards)
      }).catch(error => {
        res.status(error.statusCode || 500).jsonp(error.error)
      })
  })
}
