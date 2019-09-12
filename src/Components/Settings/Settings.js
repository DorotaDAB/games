import React from 'react';
import './Settings.css';
import lang from '../../assets/lang/lang.json';
import { EventEmitter } from '../../assets/EventEmmiter';


class Settings extends React.Component {

  setLang(lang) {
    localStorage.setItem('lang', lang);
    EventEmitter.dispatch('langChange', true)
  }

  render() {
    return (
      <section>
        <div className="settings">
          <p>{lang[localStorage.getItem('lang')].selectLanguage}</p>
          <div className="settings-buttons">
            <img src={require('../../assets/img/flag-pl.png')} alt="polish" onClick={this.setLang.bind(this, 'pl') }/>  
            <img src={require('../../assets/img/flag-en.png')} alt="english" onClick={this.setLang.bind(this, 'en') }/> 
          </div>
        </div>
      </section>
    );
  } 
}

export default Settings;
