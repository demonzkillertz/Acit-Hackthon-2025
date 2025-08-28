
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserTabs from './user';
import DriverTabs from './driver';
import CompanyTabs from './company';

export default function RoleRouter() {
  const { user } = useContext(AuthContext);

  console.log('RoleRouter user:', user);

  if (!user || !user.role) return null;
  if (user.role === 'user') return <UserTabs />;
  if (user.role === 'driver') return <DriverTabs />;
  if (user.role === 'company') return <CompanyTabs />;
  return null;
}
