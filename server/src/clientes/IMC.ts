/* eslint-disable prettier/prettier */
export class IMC {
    altura: number;
    peso: number;

    constructor(altura: number, peso: number) {
        this.altura = altura;
        this.peso = peso;
    }

    calcularIMC(): number {
        return parseFloat((this.peso / (this.altura * this.altura)).toFixed(2));
    }

    informacion(): string{
        const imc = this.calcularIMC();
        if(imc < 18.5){
            return 'Peso bajo';
        }else if(imc >= 18.5 && imc <= 24.9){
            return 'Peso normal';
        }else if(imc >= 25 && imc <= 29.9){
            return 'Sobrepeso';
        }else if(imc >= 30 && imc <= 34.9){
            return 'Obesidad grado I';
        }else if(imc >= 35 && imc <= 39.9){
            return 'Obesidad grado II';
        }else{
            return 'Obesidad grado III';
        }
    }
}