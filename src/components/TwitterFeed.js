import React from 'react';
import { Typography} from '@mui/material';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import translator from '../translator/translator';

const TwitterFeed = () => {
  const i18n = translator();

  return <>
    <Typography variant="h4" sx={{marginBottom: 3}}>{i18n.t('news.title')}</Typography>
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="accuariums"
      options={{height: 400}}
      lang={navigator.language || navigator.userLanguage}
      noHeader={true}
      noFooter={true}
      theme="dark"
      noBorders={true}
      // id={1491623020250677251}
    />
  </>;

}

export default TwitterFeed;
