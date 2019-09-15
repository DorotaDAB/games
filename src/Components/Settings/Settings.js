import React from 'react';
import './Settings.css';
import lang from '../../assets/lang/lang.json';
import { EventEmitter } from '../../assets/EventEmmiter';
import { Form } from 'react-bootstrap';

class Settings extends React.Component {

  setLang(lang) {
    localStorage.setItem('lang', lang);
    EventEmitter.dispatch('langChange', true)
  }
 
  setUserBegginer() {
    localStorage.setItem('userLevel', 'Beginner');
  }

  setUserRegular() {
    localStorage.setItem('userLevel', 'Regular');
  }

  setUserAdvanced() {
    localStorage.setItem('userLevel', 'Advanced');
  }

  setUserCrazy() {
    localStorage.setItem('userLevel', 'Crazy');
  }

  render() {
    return (
      <div className="settings">
        <div className="settings--language-settings">
          <p>{lang[localStorage.getItem('lang')].selectLanguage}</p>
          <div className="settings-buttons">
            <img src={require('../../assets/img/flag-pl.png')} alt="polish" onClick={this.setLang.bind(this, 'pl') }/>  
            <img src={require('../../assets/img/flag-en.png')} alt="english" onClick={this.setLang.bind(this, 'en') }/> 
          </div>
        </div>
        <div className="settings--paddle-settings">
          <p>{lang[localStorage.getItem('lang')].paddleGameSettings}</p>
          <Form>
            <Form.Check
              type="radio"
              inline label="Beginner"
              name="formHorizontalRadios"
              onClick={this.setUserBegginer.bind(this)}
            />
            <Form.Check
              type="radio"
              inline label="Regular"
              name="formHorizontalRadios"
              onClick={this.setUserRegular.bind(this)}
            />
            <Form.Check
              type="radio"
              inline label="Advanced"
              name="formHorizontalRadios"
              onClick={this.setUserAdvanced.bind(this)}
            />
            <Form.Check
              type="radio"
              inline label="Crazy"
              name="formHorizontalRadios"
              onClick={this.setUserCrazy.bind(this)}
            />
          </Form> 
        </div>
      </div>
    );
  } 
}

export default Settings;
