// tslint:disable:jsx-no-lambda
import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';
import { reduxForm, Field, FormProps, WrappedFieldProps, WrappedFieldArrayProps, FieldArray } from 'redux-form';

import './TestForm.scss';
import { IFormData, IFormDataError, IServiceZoneError, IGeoError, IServiceZone, IGeo } from '../../../namespace';

function validateNotEmpty(value: string | undefined, name: string = 'Value'): string {
  if (!value || !value.trim()) {
    return `${name} should not empty`;
  }
  return '';
}

function isRequired(name: string): string {
  return `${name} is required`;
}

function validate(data: IFormData): IFormDataError {
  const errors: IFormDataError = {};
  errors.title = validateNotEmpty(data.title, 'Title');
  errors.descr = validateNotEmpty(data.descr, 'Description');

  if (!data.serviceZones || !data.serviceZones.length) {
    errors.serviceZones = { _error: isRequired('Service Zones') };
  }
  else {
    const szErrors: IServiceZoneError[] = [];
    data.serviceZones.forEach((zone, zoneIndex) => {
      const szError: IServiceZoneError = {};
      szError.name = validateNotEmpty(zone.name, 'Name');

      if (data.serviceZones[zoneIndex].geoSet) {
        const geoErrors: IGeoError[] = [];
        data.serviceZones[zoneIndex].geoSet.forEach((geo, geoIndex) => {
          const geoError: IGeoError = {};
          geoError.country = validateNotEmpty(geo.country, 'Country');
          geoError.city = validateNotEmpty(geo.city, 'City');
          geoErrors.push(geoError);
        });
        if (geoErrors.length) {
          szError.geoSet = geoErrors;
        }
      }

      if (!data.serviceZones[zoneIndex].phones || !data.serviceZones[zoneIndex].phones.length) {
        szError.phones = { _error: isRequired('Phones') };
      }

      szErrors.push(szError);
    });
    if (szErrors.length) {
      errors.serviceZones = szErrors;
    }
  }

  return errors;
}

interface IOwnProps {
  onSubmit(data: IFormData): void;
}

type IProps = FormProps<FormData, IOwnProps, {}> & IOwnProps;

const b = block('test-form');

@reduxForm({
  form: 'test-form',
  validate,
})
class TestForm extends React.PureComponent<IProps, {}> {
  public render() {
    const { handleSubmit, submitting, pristine, reset, submitFailed, valid } = this.props;
    const submitDisabled = submitting || submitFailed && !valid;
    return (
      <form onSubmit={handleSubmit} className={b()}>
        <Field
          name="title"
          type="text"
          component={this.renderTextField}
          placeholder="Title"
        />
        <Field
          name="descr"
          type="text"
          component={this.renderTextField}
          placeholder="Description"
        />
        <FieldArray
          name="tags"
          type="text"
          component={this.renderTextFieldArray}
          placeholder="new tag..."
        />
        <FieldArray
          name="serviceZones"
          component={this.renderServiceZoneArray}
        />
        <div className={b('actions')}>
          <button className={b('btn')} type="submit" disabled={submitDisabled}>Submit</button>
          <button className={b('btn')} type="button" disabled={pristine || submitting} onClick={reset}>
            Reset
          </button>
      </div>
      </form>
    );
  }

  @bind
  private renderGeoArray(props: WrappedFieldArrayProps<IGeo> & React.HTMLProps<HTMLInputElement>) {
    const { fields, meta: { error, touched }} = props;
    const geoInitial: IGeo = {
      country: '',
      city: '',
      street: '',
      build: '',
    };

    return (
      <div className={b('geo-array')}>
        <div className={b('actions')}>
          <button className={b('btn')} type="button" onClick={() => fields.push(geoInitial)}>Add geo</button>
          {touched && error ? <p className={b('error')}>{error}</p> : null}
        </div>
        {fields.map((geo, index) => (
          <div className={b('geo-item')} key={index}>
            <div className={b('actions')}>
              <button
                className={b('btn')}
                type="button"
                title="Remove Member"
                onClick={() => fields.remove(index)}
              >Remove geo</button>
            </div>
            <Field
              name={`${geo}.country`}
              type="text"
              component={this.renderTextField}
              placeholder="Country"
            />
            <Field
              name={`${geo}.city`}
              type="text"
              component={this.renderTextField}
              placeholder="City"
            />
            <Field
              name={`${geo}.street`}
              type="text"
              component={this.renderTextField}
              placeholder="Street"
            />
            <Field
              name={`${geo}.build`}
              type="text"
              component={this.renderTextField}
              placeholder="Build"
            />
          </div>
        ))}
      </div>
    );
  }

  @bind
  private renderServiceZoneArray(props: WrappedFieldArrayProps<IServiceZone> & React.HTMLProps<HTMLInputElement>) {
    const { fields, meta: { error, touched }} = props;
    const serviceZoneInitial: IServiceZone = {
      name: '',
      emails: [],
      geoSet: [],
      phones: [],
      socials: [],
    };

    return (
      <div className={b('service-zone-array')}>
        <div className={b('actions')}>
          <button className={b('btn')} type="button" onClick={() => fields.push(serviceZoneInitial)}>Add new zone</button>
          {touched && error ? <p className={b('error')}>{error}</p> : null}
        </div>
        {fields.map((zone, index) => (
          <div className={b('service-zone-item')} key={index}>
            <div className={b('actions')}>
              <button
                className={b('btn')}
                type="button"
                title="Remove Member"
                onClick={() => fields.remove(index)}
              >Remove zone</button>
            </div>
            <Field
              name={`${zone}.names`}
              type="text"
              component={this.renderTextField}
              placeholder="Contact set name"
            />
            <FieldArray
              name={`${zone}.geoSet`}
              component={this.renderGeoArray}
            />
            <FieldArray
              name={`${zone}.phones`}
              type="text"
              component={this.renderTextFieldArray}
              placeholder="Phone"
            />
            <FieldArray
              name={`${zone}.emails`}
              type="text"
              component={this.renderTextFieldArray}
              placeholder="Email address"
            />
            <FieldArray
              name={`${zone}.socials`}
              type="text"
              component={this.renderTextFieldArray}
              placeholder="Social link"
            />
          </div>
        ))}
      </div>
    );
  }

  @bind
  private renderTextFieldArray(props: WrappedFieldArrayProps<string> & React.HTMLProps<HTMLInputElement>) {
    const { fields, meta: { error, touched }, type, placeholder } = props;

    return (
      <div className={b('text-field-array')}>
        <div className={b('actions')}>
          <button className={b('btn')} type="button" onClick={() => fields.push('')}>Add</button>
          {touched && error ? <p className={b('error')}>{error}</p> : null}
        </div>
        {fields.map((field, index) => (
          <div className={b('field-array-item')} key={index}>
            <Field
              name={field}
              type={type}
              component={this.renderTextField}
              placeholder={placeholder}
            />
            <button
              className={b('btn')}
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            >–</button>
          </div>
        ))}
      </div>
    );
  }

  @bind
  private renderTextField(props: WrappedFieldProps<string> & React.HTMLProps<HTMLInputElement>) {
    const { input, meta: { touched, error }, type, placeholder } = props;
    return (
      <div className={b('text-field')}>
        <input className={b('text-input')} {...input} type={type} placeholder={placeholder} />
        {touched && error ? <p className={b('error')}>{error}</p> : null}
      </div>
    );
  }
}

export default TestForm;
export {
  TestForm,
  IProps as ITestFormProps,
}
