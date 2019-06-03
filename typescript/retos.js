define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConejoDomestico = /** @class */ (function () {
        function ConejoDomestico() {
            var nombre = "Conejo Domestico";
        }
        ConejoDomestico.prototype.interactuar = function (morty) {
            morty.Eventos.push("Morty " + morty.id + " se comió al conejo y tomó su piel");
            morty.inventario.push("piel de conejo");
        };
        return ConejoDomestico;
    }());
    exports.ConejoDomestico = ConejoDomestico;
    var ConejoSalvaje = /** @class */ (function () {
        function ConejoSalvaje() {
            var nombre = "Conejo Salvaje";
        }
        ConejoSalvaje.prototype.interactuar = function (morty) {
            var saludConejo = 6;
            var ataqueConejo = 3 - morty.resistencia;
            if (ataqueConejo < 0) {
                ataqueConejo = 0;
            }
            do {
                saludConejo = saludConejo - morty.fuerza;
                morty.salud = morty.salud - ataqueConejo;
            } while (saludConejo > 0 && morty.salud > 0);
            if (saludConejo <= 0) {
                morty.Eventos.push("Morty " + morty.id + " lucho contra el Conejo Salvaje y lo asesinó");
            }
            //manejar muerte de morty
        };
        return ConejoSalvaje;
    }());
    exports.ConejoSalvaje = ConejoSalvaje;
    var Tigre = /** @class */ (function () {
        function Tigre() {
            var nombre = "Tigre";
        }
        Tigre.prototype.interactuar = function (morty) {
            var saludTigre = 25;
            var ataqueTigre = 13 - morty.resistencia;
            if (ataqueTigre < 0) {
                ataqueTigre = 0;
            }
            do {
                saludTigre = saludTigre - morty.fuerza;
                morty.salud = morty.salud - ataqueTigre;
            } while (saludTigre > 0 && morty.salud > 0);
            if (saludTigre <= 0) {
                morty.Eventos.push("Morty " + morty.id + " lucho contra el Tigre Feroz y lo asesinó");
            }
            //manejar muerte de morty
        };
        return Tigre;
    }());
    exports.Tigre = Tigre;
    var Oso = /** @class */ (function () {
        function Oso() {
            var nombre = "Oso";
        }
        Oso.prototype.interactuar = function (morty) {
            var saludOso = 35;
            var ataqueOso = 16 - morty.resistencia;
            if (ataqueOso < 0) {
                ataqueOso = 0;
            }
            do {
                saludOso = saludOso - morty.fuerza;
                morty.salud = morty.salud - ataqueOso;
            } while (saludOso > 0 && morty.salud > 0);
            if (saludOso <= 0) {
                morty.Eventos.push("Morty " + morty.id + " lucho contra el Oso y lo asesinó");
            }
        };
        return Oso;
    }());
    exports.Oso = Oso;
    var Lobo = /** @class */ (function () {
        function Lobo() {
            var nombre = "Lobo";
        }
        Lobo.prototype.interactuar = function (morty) {
            var saludLobo = 15;
            var ataqueLobo = 10 - morty.resistencia;
            if (ataqueLobo < 0) {
                ataqueLobo = 0;
            }
            do {
                saludLobo = saludLobo - morty.fuerza;
                morty.salud = morty.salud - ataqueLobo;
            } while (saludLobo > 0 && morty.salud > 0);
            if (saludLobo <= 0) {
                morty.Eventos.push("Morty " + morty.id + " lucho contra el Lobo y lo asesinó");
            }
        };
        return Lobo;
    }());
    exports.Lobo = Lobo;
    var Hongo = /** @class */ (function () {
        function Hongo() {
            var nombre = "Hongo";
        }
        Hongo.prototype.interactuar = function (morty) {
            if (morty.inteligencia > 6) {
                morty.Eventos.push("Morty " + morty.id + " guardó un hongo");
                morty.inventario.push("Hongo");
            }
            else {
                morty.Eventos.push("Morty " + morty.id + " se comió el hongo y perdió vida");
                morty.salud = morty.salud - 3;
            }
        };
        return Hongo;
    }());
    exports.Hongo = Hongo;
    var Fuego = /** @class */ (function () {
        function Fuego() {
            var nombre = "Fuego";
        }
        Fuego.prototype.interactuar = function (morty) {
            if (morty.inteligencia > 7) {
                morty.Eventos.push("Morty " + morty.id + " observa el fuego");
            }
            else {
                morty.Eventos.push("Morty " + morty.id + " se quemó con el fuego");
                morty.salud = morty.salud - 8;
            }
        };
        return Fuego;
    }());
    exports.Fuego = Fuego;
    var Clavos = /** @class */ (function () {
        function Clavos() {
            var nombre = "Clavos";
        }
        Clavos.prototype.interactuar = function (morty) {
            if (morty.inteligencia > 5) {
                morty.Eventos.push("Morty " + morty.id + " guardó unos clavos peligrosos");
                morty.inventario.push("Clavos");
            }
            else {
                morty.Eventos.push("Morty " + morty.id + " pisó unos clavos y se lastimó");
                morty.salud = morty.salud - 3;
            }
        };
        return Clavos;
    }());
    exports.Clavos = Clavos;
    var Lanza = /** @class */ (function () {
        function Lanza() {
            var nombre = "Lanza";
        }
        Lanza.prototype.interactuar = function (morty) {
            morty.Eventos.push("Morty " + morty.id + " enconró una lanza y ahora tiene más fuerza");
            morty.inventario.push("Lanza");
            morty.fuerza = morty.fuerza + 3;
        };
        return Lanza;
    }());
    exports.Lanza = Lanza;
    var Arco = /** @class */ (function () {
        function Arco() {
            var nombre = "Arco y Flechas";
        }
        Arco.prototype.interactuar = function (morty) {
            morty.Eventos.push("Morty " + morty.id + " encontró un arco con flechas y ahora tiene más fuerza");
            morty.inventario.push("Arco y flechas");
            morty.fuerza = morty.fuerza + 5;
        };
        return Arco;
    }());
    exports.Arco = Arco;
    var Pocion = /** @class */ (function () {
        function Pocion() {
            var nombre = "Poción";
        }
        Pocion.prototype.interactuar = function (morty) {
            morty.Eventos.push("Morty " + morty.id + " bebió una poción que aumentó su salud");
            morty.salud = 15;
        };
        return Pocion;
    }());
    exports.Pocion = Pocion;
    var Escudo = /** @class */ (function () {
        function Escudo() {
            var nombre = "Escudo";
        }
        Escudo.prototype.interactuar = function (morty) {
            morty.Eventos.push("Morty " + morty.id + " encontró un escudo y ahora tiene más resistencia");
            morty.inventario.push("Escudo");
            morty.resistencia = morty.resistencia + 10;
        };
        return Escudo;
    }());
    exports.Escudo = Escudo;
});
