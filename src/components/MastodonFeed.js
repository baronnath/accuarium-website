// src/components/MastodonFeed.js

import React from 'react';
import { Typography} from '@mui/material';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import translator from '../translator/translator';

const MastodonFeed = () => {
  const i18n = translator();
  const iframeSource = '<iframe allowfullscreen sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox" width="100%" height="800" src="https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fmastodon.cloud%2Fusers%2Faccuarium&theme=dark&size=100&header=false&replies=false&boosts=false"></iframe>';

  return <>
    <Typography variant="h4" sx={{marginBottom: 3}}>{i18n.t('news.title')}</Typography>
    <iframe style={styles.iframe} allowfullscreen sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox" width="100%" height="800" src="https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fmastodon.cloud%2Fusers%2Faccuarium&theme=dark&size=100&header=false&replies=false&boosts=false"></iframe>
  </>;

}

export default MastodonFeed;

const styles = {
  iframe: {
    border: 0,
  },
}; 

