import {INavbarData} from "./helper";

export  const  navbarDAta: INavbarData[] = [

  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'employer',
    icon: 'fal fa-user',
    label: 'Employer',
    items: [
      {
        routeLink: 'employer/list',
        label: 'Liste Employee'
      },
      {
        routeLink: 'employer/create',
        label: 'Ajouter Employee'
      }
    ]
  },
  {
    routeLink: 'pointage',
    icon: 'fal fa-hand-pointer',
    label: 'Pointage'
  },
  {
    routeLink: 'ficheDePaie',
    icon: 'fal fa-credit-card',
    label: 'FicheDePaie'
  },
  {
    routeLink: 'holidays',
    icon: 'fa fa-calculator',
    label: 'Holidays',
    roles: ['ADMIN']
  },
  {
    routeLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
    items: [
      {
        routeLink: 'settings/listHoliday',
        label: 'List Holiday'
      },
      {
        routeLink: 'settings/listCalendrier',
        label: 'List Calendrier'
      }
    ]
  },

];
