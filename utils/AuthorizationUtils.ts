import { OrganizationUserRole } from '../api';

export function canAddMember(role: OrganizationUserRole): boolean {
  return role === OrganizationUserRole.OWNER;
}

export function canAddAnnouncement(role: OrganizationUserRole): boolean {
  return role === OrganizationUserRole.OWNER;
}

export function canAddFilesFolders(role: OrganizationUserRole): boolean {
  return role === OrganizationUserRole.OWNER;
}
