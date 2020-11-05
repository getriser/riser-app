import { OrganizationUserRole } from '../api';

export function canAddMember(role: OrganizationUserRole): boolean {
  return role === OrganizationUserRole.OWNER;
}
