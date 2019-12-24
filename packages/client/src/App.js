import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  mainDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'gray'
  },
  appDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80vw',
    height: '80vh',
    backgroundColor: 'lightblue'
  },
  childDiv:{
    display: 'flex',
    marginTop: '10px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
  },
  textarea: {
    width: '20vw',
    height: '20vh'
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
  },
  imageContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    overflow: 'auto'
  },
  loadingFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    zIndex: 999
  }
}

class App extends React.Component {
  state = {
    precio: '',
    descripcion: '',
    isLoading: false,
    imageUrl: null
  };

  _hadleChange = e => {
    const input = e.target;
    this.setState({
      [input.id]: input.value
    });
  }

  _handleSubmit = e => {
    e.preventDefault();
    const {
      precio,
      descripcion
    } = this.state
    this.setState({ isLoading: true }, async () => {
      try {
        const result = await axios.post('http://localhost:4000', { precio, descripcion });
        const { data } = result;
        this.setState({
          imageUrl: data.imageUri,
          isLoading: false
        });
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false })
      }
      
    })
  }

  render(){
    const { isLoading, imageUrl } = this.state
    return (
      <div style={ styles.mainDiv }>
        {
          isLoading && (
            <div style={ styles.loadingFilter } >
              <CircularProgress size={88} />
            </div>
          ) 
        }
        {
          imageUrl ? (
            <div style={ styles.imageContainer }>
              <img 
                alt="imagenPublicacion"
                src={ imageUrl }
              />
            </div>
          ) : (
            <div style={ styles.appDiv }>
              <Typography variant="h2" gutterBottom> Publica tu auto</Typography>
              <form
                onSubmit={ this._handleSubmit }
              >
                <div style={ styles.childDiv }>
                  <TextField
                    id="precio" 
                    label="Precio" 
                    variant="outlined" 
                    onChange={ this._hadleChange }
                    disabled={ isLoading } 
                    required
                  />
                </div>
                <div style={ styles.childDiv }>
                  <div style={ styles.textarea }>
                    <TextField
                      id="descripcion"
                      label="Descripción"
                      multiline
                      rows="4"
                      variant="outlined"
                      fullWidth
                      onChange={ this._hadleChange }
                      disabled={ isLoading }
                      required
                    />
                  </div>
                </div>
                <div style={ styles.buttonContainer }>
                  <Button
                    color="primary"
                    type="submit"
                    size="medium"
                    variant="contained"
                    disabled={ isLoading }
                  >
                    Publicar
                  </Button>
                </div>
              </form>
            </div>
          )
        }

      </div>
    );
  }
}

export default withStyles(styles)(App);
