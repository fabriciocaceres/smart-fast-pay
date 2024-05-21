import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';

export const MasterLayout: FC = () => {
    return (
        <div className="wrapper">
            <Navbar />

            <div className="main d-flex flex-column flex-column-fluid">
                <Header />

                <main className="content d-flex flex-column flex-column-fluid">
                    <Outlet />
                </main>

                {/* <footer className="footer">
                  <div className="container-fluid">
                      <div className="row text-muted">
                          <div className="col-6 text-start">
                              <p className="mb-0">
                                  <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                      <strong>AdminKit</strong>
                                  </a>{' '}
                                  -{' '}
                                  <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                      <strong>Bootstrap Admin Template</strong>
                                  </a>{' '}
                                  &copy;
                              </p>
                          </div>
                          <div className="col-6 text-end">
                              <ul className="list-inline">
                                  <li className="list-inline-item">
                                      <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                          Support
                                      </a>
                                  </li>
                                  <li className="list-inline-item">
                                      <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                          Help Center
                                      </a>
                                  </li>
                                  <li className="list-inline-item">
                                      <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                          Privacy
                                      </a>
                                  </li>
                                  <li className="list-inline-item">
                                      <a className="text-muted" href="https://adminkit.io/" target="_blank">
                                          Terms
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </footer> */}
            </div>
        </div>
    );
};
