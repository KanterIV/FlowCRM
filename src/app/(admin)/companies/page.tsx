import React from 'react';
import Header from '../../components/Header/Header';
import Toolbar from '../../components/Toolbar/Toolbar';
import SearchInput from '../../components/SearchInput/SearchInput';
import AddCompanyButton from '../../components/AddCompanyButton/AddCompanyButton';
import CompanyTable from '../../components/CompanyTabel/CompanyTabel';
import CompanyRow from '../../components/CompanyRow/CompanyRow';
import { Status } from '../../components/StatusLabel/StatusLabel';

export default function page() {
  return (
    <>
      <Header>Compains</Header>
      <Toolbar action={<AddCompanyButton />}>
        <SearchInput />
      </Toolbar>
      <CompanyTable>
        <CompanyRow
          id={1}
          category="Products"
          company="Costco"
          status={Status.Pending}
          promotion={true}
          country="USA"
          joinedDate={'07.23.2025'}
        />
      </CompanyTable>
    </>
  );
}
