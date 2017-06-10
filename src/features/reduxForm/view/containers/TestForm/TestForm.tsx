import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';
import { reduxForm, Field, FormProps, WrappedFieldProps } from 'redux-form';

import './TestForm.scss';
import { IFormData, IFormDataError, IServiceZoneError, IGeoError } from '../../../namespace';

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

  if (!data.serviceZones || !data.serviceZones.length) { errors.serviceZones = { _error: isRequired('Service Zones') }; }
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
    const { handleSubmit } = this.props;
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
      </form>
    );
  }

  @bind
  private renderTextField(props: WrappedFieldProps<string> & React.HTMLProps<HTMLInputElement>) {
    const { input, meta: { touched, error }, type, placeholder } = props;
    return (
      <div className={b('text-field')}>
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error ?
          <div className={b('erroe')}><span>{error}</span></div> : null
        }
      </div>
    );
  }
}

export default TestForm;
export {
  TestForm,
  IProps as ITestFormProps,
}
