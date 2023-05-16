import React from 'react';
import { makeStyles } from '@material-ui/core'


export const useStyles = makeStyles({

  footerContainer: {
    width: '100%',
    color: 'white',
    background: 'linear-gradient(90deg, rgba(1,16,14,1) 30%, rgba(172,172,172,1) 100%)',
  },


  linkContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
  },


  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
    paddingTop: '1%'
  },

  links2: {
    display: 'flex',
    padding: '5%',
    paddingTop: '5%',


  },

  aStyles: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#929191'
    },
    lineHeight: '180%'
  },


  iconStyles: {
    color: 'white',
    textDecoration: 'none',
  },

  
  bottom: {
    textAlign: 'center',
    padding: '1%'
  },
})  