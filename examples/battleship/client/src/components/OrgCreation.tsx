import React, { useState } from 'react';

import { useStatefulInput } from '../utils/useStatefulInput';
import { Button } from 'reactstrap'

export const OrgCreation = ({ createOrg } : {createOrg : any} ) => {
  
  const [orgName, orgNameInput] = useStatefulInput('orgName', 'Organization Name')

  return (
    <>
      <h2>Create your organization</h2>
      <p>
        In order to Baseline you need to create an organization first.
      </p>

      {orgNameInput}

      <Button 
        onClick={  _ => createOrg(orgName) }
        disabled={orgName === ''}
      >
        Create
      </Button>
    </>
  );
};