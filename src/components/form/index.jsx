import React from 'react';
import InputComponent from '../input';
import Button from '../button';

import './index.scss';

const Form = (props) => {
  const { closeForm, inputChangeHandler, formData, saveNote, updateNote } = props;

  const disableSave = () => {
    return !formData.title || !formData.tagline || !formData.body ? true : false;
  };

  return (
    <>
      <div className="form">
        <div className="close" onClick={closeForm}>
          <i className="bx bx-x"></i>
        </div>

        <div className="form-control">
          <InputComponent type="text" id="title" onChange={inputChangeHandler} value={formData.title} />
          <label htmlFor="title" className="control-label">
            Title
          </label>
        </div>

        <div className="form-control">
          <InputComponent type="text" id="tagline" onChange={inputChangeHandler} value={formData.tagline} />
          <label htmlFor="tagline" className="control-label">
            Tag Line
          </label>
        </div>

        {console.log(formData)}

        <div className="form-control">
          <InputComponent type="textarea" id="body" rows="4" onChange={inputChangeHandler} value={formData.body} />
          <label htmlFor="body" className="control-label">
            Body
          </label>
        </div>

        <div className="form-footer">
          <Button type="danger" onClick={closeForm}>
            Cancel
          </Button>
          <Button onClick={formData.id ? updateNote : saveNote} disabled={disableSave()}>
            {formData.id ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;
