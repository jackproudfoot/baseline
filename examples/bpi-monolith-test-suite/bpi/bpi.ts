import { BpiSubject } from "./bpiSubject";

export class BPI {
    organizations: BpiSubject[] = [];

    // Used to register a new organization with the BPI and the external registry
    addOrganization(id: string, name: string) {
        const organization = new BpiSubject();
        organization.id = id;    
        organization.name = name;    

        this.organizations.push(organization);
    }

    // Retrieves the organization/BpiSubject's details 
    getOrganizationById(id: string): BpiSubject {
        const orgs = this.organizations.filter(org => org.id === id);

        return orgs[0];
    }
}