export const SITE_CONFIG = {
    name: "Infinic",
    slogan: "Assistência Técnica Especializada",
    whatsapp: {
        number: "5517997064643",
        display: "(17) 99706-4643",
        defaultMessage: "Olá! Gostaria de um orçamento para o meu equipamento.",
        get link() {
            return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
        },
    },
    warrantyDays: 90,
    address: {
        city: "São José do Rio Preto",
        state: "SP",
    },
    hours: "Segunda a Sexta das 08h às 17h",
};