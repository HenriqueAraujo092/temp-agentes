// export class Familia {
//     public responsavel_familiar : string;
//     public nis: string;
//     public rua: string;
//     public numero_casa: string;
//     public complemento: string;
//     public bairro:  string;
//     public cep: string;
//     public municipio: string;
//     public distrito: string;
//     public telefone: string;
//     public renda_per_capta:  number;
//     public acesso_esgoto:  number;
//     public acesso_agua:  number;
//     public acesso_energia: number;
//     public locomocao:  number;
// }

export class Family {
    public nis: string;
    public family_responsible: string;
    public phone: string;
    public sewer_access: boolean;
    public water_access: boolean;
    public electricity_access: boolean;
    public transport: boolean;
    // public address_id: number;
    public revenue_id: any;
}