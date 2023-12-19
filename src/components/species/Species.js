import React, {useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  CircularProgress,
  ButtonBase,
} from '@mui/material';
import { 
  SquareFoot as SquareFootIcon,
  ViewInAr as ViewInArIcon,
  Grass as GrassIcon,
  SetMeal as SetMealIcon,
  DeviceThermostat as DeviceThermostatIcon,
  Gradient as GradientIcon,
  BlurOn as BlurOnIcon,
  Deblur as DeblurIcon,
} from '@mui/icons-material';
import Icon from '@mdi/react';
import {
  mdiLeaf,
  mdiFoodDrumstick,
  mdiPaw,
  mdiSprayBottle,
  mdiChevronRight,
  mdiTableOfContents,
  mdiSignCaution,
  mdiArmFlex,
  mdiJumpRope,
  mdiBarley,
  mdiTarget,
  mdiVanish,
  mdiShovel,
  mdiSnail,
  mdiBandage,
  mdiFlash,
  mdiMoonWaningCrescent,
  mdiPeace,
  mdiEyeOffOutline,
  mdiArrowCollapseAll,
  mdiCardsHeartOutline,
  mdiLeafOff,
  mdiFish,
  mdiGenderMale,
  mdiGenderFemale,
} from '@mdi/js';
import Alert from '../Alert';
import Share from '../blog/Share';
import Spinner from '../app/Spinner';
import Modal from '../app/Modal';
import Featured from '../Featured';
import translator from '../../translator/translator';
import { Api } from '../../helpers/axios';
import { sanitize } from '../../helpers/blog';
import { ucFirst, camelize } from '../../helpers/global';
import { colors } from '../../theme';
import config from '../../config/app';


const Species = () => {

  const params = useParams();
  const i18n = translator();
  const locale = i18n.locale;
  const navigate = useNavigate();
  const user = {
    locale: locale,
    accessToken: null
  }
  const api = new Api(user);

  const [isLoading, setLoading] = useState(true);
  const [species, setSpecies] = useState([]);
  const [share, setShare] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });
  const [unitSystem, setUnitSystem] = useState('metric');
  const [units, setUnits] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  function handleUnits(unitSystem) {
    let units;
    switch(unitSystem) {
      case 'metric':
        units = {
          length: 'cm',
          volume: 'liter',
          temperature: 'celsius',
          gh: 'ppm',
          kh: 'ppm',
        };
        break;
      case 'imperial':
        units = {
          length: 'in',
          volume: 'liter',
          temperature: 'fahrenheit',
          gh: 'ppm',
          kh: 'ppm',
        };
    }
    setUnits(units);
  }

  useEffect(() => {
    const scientificName = ucFirst(params.slug.replace('-', ' '));
    api.getSpeciesByName(scientificName)
      .then(res => { 
        setSpecies(res.data.species);
        console.log('SPECIES',res.data.species);
        setLoading(false);
      })
      .catch(err => {
        handleError(err);
      });

  },[]);

  useEffect(() => {
    handleUnits(unitSystem);
  },[unitSystem]);

  const handleShare = (e, slug) => {
    setAnchorEl(e.currentTarget);
    setShare(slug);
  }

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  function paramValues(values, caption) {
    return <div style={styles.paramContainer}>
        <Typography fontWeight='bold' style={styles.parameters}>
          {values}
        </Typography>
       { caption &&
          <Typography style={styles.paramDesc}>
            {ucFirst(caption)}
          </Typography>
        }
      </div>
  }

  function getFeedIcon(feed) {
    const herb = <Icon path={mdiLeaf} title="herbivore" size={2} />
    const carn = <Icon path={mdiFoodDrumstick} title="carnivore" size={2} />
    switch(feed){
      case 'herbivore':
        return herb;
      case 'carnivore':
        return carn;
      default:
        return(
          <>
            {herb}{carn}
          </>
        );
    }
  }

  function getBehaviorIcon(icon) {
    switch(icon) {
      case 'paw':
        return mdiPaw;
        break;
      case 'spray-bottle': 
        return mdiSprayBottle;
        break;
      case 'table-of-contents':
        return mdiTableOfContents;
        break;
      case 'sign-caution':
        return mdiSignCaution;
        break;
      case 'arm-flex':
        return mdiArmFlex;
        break;
      case 'jump-rope':
        return mdiJumpRope;
        break;
      case 'barley':
        return mdiBarley;
        break;
      case 'target':
        return mdiTarget;
        break;
      case 'vanish':
        return mdiVanish;
        break;
      case 'shovel':
        return mdiShovel;
        break;
      case 'snail':
        return mdiSnail;
        break;
      case 'bandage':
        return mdiBandage;
        break;
      case 'flash':
        return mdiFlash;
        break;
      case 'moon-waning-crescent':
        return mdiMoonWaningCrescent;
        break;
      case 'peace':
        return mdiPeace;
        break;
      case 'eye-off-outline':
        return mdiEyeOffOutline;
        break;
      case 'arrow-collapse-all':
        return mdiArrowCollapseAll;
        break;
      case 'cards-heart-outline':
        return mdiCardsHeartOutline;
        break;
      case 'leaf-off':
        return mdiLeafOff;
        break;
    }
  }

  function getBehaviour(icon, caption, color) {

    return <ButtonBase sx={{marginTop: 2, width: '100%'}}>
      <Paper
        key={caption}
        sx={styles.row}
        style={{padding: 10, paddingLeft: 20, justifyContent: 'space-between', alignItems: 'center'}}
        elevation={color == colors.secondary ? 1 : 6}
        onClick={() => {
          console.log('CLICK')
          setModalOpen(true);
          setModalContent({
            icon: getBehaviorIcon(icon),
            description: `behavior.${camelize(caption)}.description`,
            color: color
          });
        }}
      >
          <Icon
            path={getBehaviorIcon(icon)} 
            color={color}
            size={2}
          />
          { caption &&
            <Typography sx={styles.widthSurfaceDesc}>
              {ucFirst(caption)}
            </Typography>
          }
          <Box>
            <Icon
              path={mdiChevronRight}
              size={2}
              color={colors.lightText}
              style={{marginTop: 0}}
            />
          </Box>
      </Paper>
    </ButtonBase>
  }

  function getCoexistance(coexist) {

    function getCoexistanceIcon(coexist, color) {
      const size = 1;
      const indiv = <Icon path={mdiFish} title="individual" size={size} color={color}/>
      const male = <Icon path={mdiGenderMale} title="male" size={size}  color={color}/>
      const female = <Icon path={mdiGenderFemale} title="female" size={size}  color={color}/>
      const group = <Icon path={mdiArrowCollapseAll} title="mixed group" size={size}  color={color}/>
      switch(coexist){

        case 'couple':
          return <>{male}{female}</>;
        case 'onlyMasc':
          return <>{male}</>;
        case 'onlyFem':
          return <>{female}</>;
        case 'harem':
          return <>{male}{female}{female}</>;;
        case 'inverseHarem':
          return <>{female}{male}{male}</>;;
        case 'mixedGroup':
          return <>{group}</>;
        default:
          return <>{indiv}</>;
      }
    }

    return(
      <Paper
        sx={styles.surface}
        style={{textAlign: 'center', alignItems: 'space-between', padding: 10}}
        color={species.coexistence[coexist] ? colors.quaternary : colors.disabled}
      >
        {getCoexistanceIcon(coexist, species.coexistence[coexist] ? colors.primary : colors.disabled) }
        <Typography style={{ color: species.coexistence[coexist] ? colors.primary : colors.disabled }}>
          { ucFirst(i18n.t(`species.coexistence.${coexist}`)) }
        </Typography>
      </Paper>
    );
  }  


  return (
      <>
        { isLoading ?
            <Spinner />
          :
            <>
              <Box sx={styles.heroContainer}>
                <Container sx={styles.speciesImageContainer} maxWidth="sm">
                    <img
                      src={`${config.backend.imagesUrl}species/${species.scientificName.replace(' ', '-').toLowerCase()}/${species.images[0]}`}
                      alt={species.scientificName}
                      loading="lazy"
                      style={styles.speciesImage}
                    />
                    <Box sx={styles.row} style={{width: '100%', marginTop: 40}}>
                      { species.family && 
                        <Typography sx={styles.familyGroup}>{ucFirst(species.family.name[locale])}</Typography>
                      }
                      { species.group &&
                        <Typography sx={[styles.familyGroup,{borderLeft: 1}]}>{ucFirst(species.group.name[locale])}</Typography>
                      } 
                    </Box>
                </Container>
              </Box>
              <Container sx={{marginTop: 3}} maxWidth="sm">
               <Typography variant="h2" component="h2" maxWidth="sm" sx={styles.title}>
                  {ucFirst(species.name[locale])}
                </Typography>
                <Typography variant="h6" component="h1" maxWidth="sm" sx={styles.subtitle}>
                  {species.scientificName}
                </Typography>
                <Box sx={styles.row} style={{marginTop: 40}}>
                  <Paper
                    elevation={12}
                    sx={styles.surface}
                    color={colors.quaternary}
                    style={{paddingTop: 30}}
                  >
                      <Box sx={styles.paramsContainer} style={{paddingBottom: 0}}>
                        <SquareFootIcon sx={styles.icon} />
                        {paramValues(`${species.length.min} - ${species.length.max} ` + i18n.t('measures.' + units.length + 'Abbr'),i18n.t('species.size'))}
                      </Box>
                      <Box sx={styles.paramsContainer} style={{paddingTop: 20}}>
                        <ViewInArIcon sx={styles.icon} />
                        {paramValues(species.minTankVolume + ' ' + i18n.t('measures.' + units.volume + 'Abbr'),i18n.t('species.minTank'))}
                      </Box>
                  </Paper>
                  <Box style={{marginLeft: 10, flex: 2}}>
                    <Paper sx={styles.smallSurface} style={{marginTop: 0}}>
                        {getFeedIcon(species.feed.name.en)}
                        {paramValues(ucFirst(species.feed.name[locale]),i18n.t('species.feed.one'))}
                    </Paper>
                    <Paper sx={styles.smallSurface} style={{marginTop: 10}}>
                        {paramValues(ucFirst(species.depth.name[locale]),i18n.t('species.swimArea'))}
                    </Paper>
                  </Box>
                </Box>
                
                <Box sx={styles.row} style={{marginTop: 40, alignItems: 'stretch', justifyContent: 'flex-start'}}>
                  { species.parameters['temperature'].min && species.parameters['temperature'].max &&
                    <Paper sx={styles.smallSurface} style={{marginTop: 0}}>
                      <DeviceThermostatIcon sx={styles.icon} />
                      {paramValues(`${species.parameters['temperature'].min} - ${species.parameters['temperature'].max} ` + i18n.t('measures.' + units.temperature + 'Abbr'),i18n.t('species.temperature'))}
                    </Paper>
                  }
                  { species.parameters['ph'].min && species.parameters['ph'].max &&
                    <Paper sx={styles.smallSurface} style={{marginTop: 0, marginLeft: 20}}>
                      <GradientIcon sx={styles.icon} />
                      {paramValues(`${species.parameters['ph'].min} - ${species.parameters['ph'].max}`, i18n.t('species.ph'))}
                    </Paper>
                  }
                  { species.parameters['gh'].min && species.parameters['gh'].max &&
                    <Paper sx={styles.smallSurface} style={{marginTop: 0, marginLeft: 20}}>
                      <BlurOnIcon sx={styles.icon} />
                      {paramValues(`${species.parameters['gh'].min} - ${species.parameters['gh'].max} ${i18n.t('measures.' + units.gh + 'Abbr')}`, i18n.t('species.gh'))}
                    </Paper>
                  }
                  { species.parameters['kh'].min && species.parameters['kh'].max &&
                    <Paper sx={styles.smallSurface} style={{marginTop: 0, marginLeft: 20}}>
                      <DeblurIcon sx={styles.icon} />
                      {paramValues(`${species.parameters['kh'].min} - ${species.parameters['kh'].max} ${i18n.t('measures.' + units.kh + 'Abbr')}`, i18n.t('species.kh'))}
                    </Paper>
                  }
                </Box>

                <Typography variant="h6" component="h3" maxWidth="sm" style={{marginTop: 40}}>
                  {i18n.t('species.behavior')}
                </Typography>
                {/* Wild */}
                { species.wild &&
                    getBehaviour('paw', 'wild', colors.error)
                }
                {/* Cleaning */}
                { species.cleaning &&
                    getBehaviour('spray-bottle', 'cleaning')
                }

                { species.behavior.map(behavior => {
                    return getBehaviour(behavior.icon, behavior.name[locale], behavior.warning ? colors.secondary : colors.white)
                  })
                }

                <Typography variant="h6" component="h3" maxWidth="sm" style={{marginTop: 40}}>
                  {i18n.t('species.coexistence.one')}
                </Typography>
                <Box sx={styles.row} style={{marginTop: 20, alignItems: 'stretch', justifyContent: 'flex-start', gap: 10}}>
                  { getCoexistance('indiv') }
                  { getCoexistance('onlyFem') }
                  { getCoexistance('onlyMasc') }
                </Box>
                <Box sx={styles.row} style={{marginTop: 10, alignItems: 'stretch', justifyContent: 'flex-start', gap: 10}}>
                  { getCoexistance('mixedGroup') }
                  { getCoexistance('couple') }
                  { getCoexistance('harem') }
                  { getCoexistance('inverseHarem') }
                </Box>

                <Featured></Featured>

              </Container>
            </>
        }

        <Modal isOpen={isModalOpen} setOpen={() => setModalOpen(false)}>
          <Icon
            path={modalContent.icon} 
            color={modalContent.color ? modalContent.color : colors.primary}
            size={2}
          />
          <Typography sx={{mt: 1}}>{i18n.t(modalContent.description)}</Typography>
        </Modal>

        <Alert
          message={alert.message}
          type={alert.type}
          isOpen={alert.open}
          onClose={() => setAlert(prevAlert => ({
            ...prevAlert,
            open: false,
          }))}
        />

      </>
  );
};

export default Species;

const styles = {
  heroContainer: {
    backgroundColor: 'black',
    paddingTop: 15,
    paddingBottom: 4,
  },
  speciesImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speciesImage: {
    width: '80%',
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyGroup: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: {xs: 35, sm: 60},
  },
  subtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: {xs: 14, sm: 20},
  },
  surface: {
    flex: 1,
    // margin: 0,
    // marginTop: 40,
    // marginRight: 40 / 2,
    // paddingTop: 40 * 1.3,
  },
   smallSurface: {
    textAlign: 'center',
    alignItems:'center',
    padding: 3,
    paddingTop: 4,
    // marginRight: 0,
    // padding: 20 * 1.3,
  },

  paramsContainer: {
    flex:1,
    textAlign: 'center',
    padding: 3,
    paddingTop: 0,
    marginTop: 0,
  },
  paramContainer: {
    marginTop: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parameters: {
    fontSize: 18,
    marginTop: 6,
    // lineHeight: 18,
  },
  paramDesc: {
    color: colors.primary,
    fontSize: 9,
    // lineHeight: 9,
  },
  icon: {
    fontSize: 40,
  }
}