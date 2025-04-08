import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';


@customElement("umb-time-only")
export default class UmbTimeOnly extends LitElement implements UmbPropertyEditorUiElement{

  #timeValue = {
    hour: 0,
    minutes: 0,
    seconds: 0
  }

  public get value(){
    return this.#timeValue
  }

  @property()
  public set value(value){
    this.#timeValue = value
  }

  @property()
  public timeValue = this.value
  

  render() {
    return html`
      <div class="time-only-container">
        <uui-input id="time-only" pristine="" label="umbtimeonly" type="time" .value=${this.#buildTimeStringFromObject(this.#timeValue)} @change=${this.#timeChanged} step="2"></uui-input>
        <uui-button title="Use current time" pristine="" label="Button" look="primary" @click=${this.#useCurrentTime}>Current Time</uui-button>
      </div>
    `;
  }

  #timeChanged(event: InputEvent) {
    const timeObject = this.#buildTimeObjectFromString((event.target as HTMLInputElement).value);
    this.value = timeObject;
    console.log(this.value)
    this.#dispatchChangeEvent();
  }

  #dispatchChangeEvent() {
    this.dispatchEvent(new UmbChangeEvent())
  }

  #useCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    this.#timeValue = {
      hour: hours,
      minutes: minutes,
      seconds: seconds
    }
    //@ts-ignore
    this.timeValue = `${hours}:${minutes}:${seconds}`;
    this.#dispatchChangeEvent();
  }

  #buildTimeStringFromObject(timeValue: { hour: number, minutes: number, seconds: number }) {
    // Upon using the editor for the first time, #timeValue is undefined on the first render. Make this check to make sure it renders correctly on initiation.
    if(!timeValue) return "";
    const hour = String(timeValue.hour).padStart(2, '0');
    const minutes = String(timeValue.minutes).padStart(2, '0');
    const seconds = String(timeValue.seconds).padStart(2, '0');
    return `${hour}:${minutes}:${seconds}`;
  }

  #buildTimeObjectFromString(timeString: string) {
    const [hour, minutes, seconds = 0] = timeString.split(':').map(str => Number(str)); //Number(str) is used to convert the string to a number
    return {
      hour: hour,
      minutes: minutes,
      seconds: seconds
    }
  }

  static styles = css`
    .time-only-container {
      display: flex;
      gap: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'umb-time-only': UmbTimeOnly
  }
}