import React from 'react';
import './Settings.css';
import lang from '../../assets/lang/lang.json';
import { EventEmitter } from '../../assets/EventEmmiter';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis , faTools } from '@fortawesome/free-solid-svg-icons';

class Settings extends React.Component {

  setLang(lang) {
    localStorage.setItem('lang', lang);
    EventEmitter.dispatch('langChange', true)
  }
 
  setUserLevel(event) {
    localStorage.setItem('userLevel', event.target.value);
  }
 
  render() {
    return (
      <div className="settings">
        <div className="settings box-settings">
          <div className="settings-title"> 
            <FontAwesomeIcon icon={faTools} /> {lang[localStorage.getItem('lang')].gobalSettings}
          </div>
          <p>{lang[localStorage.getItem('lang')].selectLanguage}</p>
          <div className="settings-buttons">
            <img src={require('../../assets/img/flag-pl.png')} alt="polish" onClick={this.setLang.bind(this, 'pl') }/>  
            <img src={require('../../assets/img/flag-en.png')} alt="english" onClick={this.setLang.bind(this, 'en') }/> 
          </div>
        </div>
        <div className="settings box-settings">
          <div className="settings-title"> <FontAwesomeIcon icon={faTableTennis} /> {lang[localStorage.getItem('lang')].pongSettings}</div>
          <p>{lang[localStorage.getItem('lang')].paddleGameSettings}</p>
          <Form>
            <Form.Check
              type="radio"
              value="Beginner"
              defaultChecked={localStorage.getItem('userLevel') === 'Beginner'}
              inline label={lang[localStorage.getItem('lang')].Beginner}
              name="formHorizontalRadios"
              onClick={this.setUserLevel.bind(this)}
            />
            <Form.Check
              type="radio"
              value="Regular"
              defaultChecked={localStorage.getItem('userLevel') === 'Regular'}
              inline label={lang[localStorage.getItem('lang')].Regular}
              name="formHorizontalRadios"
              onClick={this.setUserLevel.bind(this)}
            />
            <Form.Check
              type="radio"
              value="Advanced"
              defaultChecked={localStorage.getItem('userLevel') === 'Advanced'}
              inline label={lang[localStorage.getItem('lang')].Advanced}
              name="formHorizontalRadios"
              onClick={this.setUserLevel.bind(this)}
            />
            <Form.Check
              type="radio"
              value="Crazy"
              defaultChecked={localStorage.getItem('userLevel') === 'Crazy'}
              inline label={lang[localStorage.getItem('lang')].Crazy}
              name="formHorizontalRadios"
              onClick={this.setUserLevel.bind(this)}
            />
          </Form> 
        </div>
      </div>
    );
  } 
}

export default Settings;
