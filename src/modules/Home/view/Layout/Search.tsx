import * as React from 'react';
import * as block from 'bem-cn';
import { PageHeader } from 'react-bootstrap';
import { SearchRepositoriesInput } from 'features/searchRepositories';
import * as GitHubIcon from './images/github-icon.png';
import './Layout.scss';

function Search(props: {}) {
  const b = block('index-page');
  return (
    <div>
      <PageHeader>
        <img className={b('github-icon')()} src={GitHubIcon} height="64"/>
        <small>
          Search repositories on github
        </small>
      </PageHeader>
      <SearchRepositoriesInput/>
    </div>
  );
}

export default Search;
