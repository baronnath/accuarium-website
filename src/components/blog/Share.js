import React from 'react';
import { Link } from "react-router-dom";
import {
  Popover,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
	WhatsApp as WhatsAppIcon,
	Facebook as FacebookIcon,
	Twitter as TwitterIcon,
	Email as EmailIcon,
	Link as LinkIcon
} from '@mui/icons-material';
import { getDeviceType } from '../../helpers/global';
import translator from '../../translator/translator';

const Share = ({ id, isOpen, onClose, anchorEl, type, element, position = 'left' }) => {

  const i18n = translator();
  let sh = {
    title: '',
    url: '',
    slug: '',
  }

  switch(type) {
    case 'post':
      sh.title = element.title.rendered;
      sh.url = `${window.location.origin}/post/${element.slug}`;
      sh.slug = element.slug;
      break;
    case 'species':
      const slug = element.scientificName.replace(' ', '-').toLowerCase();
      sh.title = element.scientificName;
      sh.url = `${window.location.origin}/species/${slug}`;
      sh.slug = slug;
      break;
    default:
      return;
  }



	function handleShare(method) {
    let link;
    const encodedAhref = encodeURIComponent(sh.url);

    switch (method) {
    	case "whatsapp":
    		let baseUrl = getDeviceType() == "mobile"
    			? "api.whatsapp.com"
    			: "web.whatsapp.com";
        link = `https://${baseUrl}/send?text=${sh.title}%0A${encodedAhref}`;
        open(link);
        break

      case "facebook":
        link = `https://www.facebook.com/sharer.php?u=${encodedAhref}`;
        open(link);
        break

      case "twitter":
        link = `https://twitter.com/share?url=${encodedAhref}&text=${sh.title}`;
        open(link);
        break

      case "email":
      	link = `mailto:?subject=${sh.title}&body=${i18n.t(`share.${type}.emailBody`)}%0A${encodedAhref}`;
      	open(link);
        break

      case "copy":
        navigator.clipboard.writeText(sh.url)
        break

      default:
        break
    }
  }

  function open(socialLink) {
    window.open(socialLink, "_blank")
  }

	return (
		<Popover
		  id={id}
		  open={isOpen == sh.slug}
		  onClose={() => onClose(false)}
		  anchorEl={anchorEl}
		  anchorOrigin={{
    		vertical: 'bottom',
		    horizontal: position,
		  }}
		  transformOrigin={{
		    vertical: 'top',
		    horizontal: position,
		  }}
		>
      <List dense={true}>
      	<ListItem
          button
          id={id + "-whatsapp"}
          onClick={() => handleShare("whatsapp")}
        >
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          <ListItemText primary="WhatsApp" />
        </ListItem>
        <ListItem
          button
          id={id + "-facebook"}
          onClick={() => handleShare("facebook")}
        >
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="Facebook" />
        </ListItem>
       	<ListItem
          button
          id={id + "-twitter"}
          onClick={() => handleShare("twitter")}
        >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
        <ListItem
          button
          id={id + "-email"}
          onClick={() => handleShare("email")}
        >
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" />
        </ListItem>
       <ListItem
          button
          id={id + "-copy"}
          onClick={() => handleShare("copy")}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("share.copyLink")} />
        </ListItem>
      </List>
		</Popover>
	)
};

export default Share;