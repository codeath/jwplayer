import { getLabel, getCode, getPlayerLanguage } from 'utils/language';
import { createElement } from 'utils/dom';
import sinon from 'sinon';

describe.only('languageUtils', function() {

    describe('getLabel from unsupported codes', function() {

        it('should not change value if there is no matching language code', function() {
            expect(getLabel()).to.equal(undefined);
            expect(getLabel(null)).to.equal(undefined);
            expect(getLabel('po')).to.equal('po');
            expect(getLabel('pol')).to.equal('pol');
        });

        describe('getLabel from ISO 639-1 codes', function() {

            it('should be English for its codes', function() {
                const expected = 'English';

                expect(getLabel('en')).to.equal(expected);
            });

            it('should be Chinese for its codes', function() {
                const expected = 'Chinese';

                expect(getLabel('zh')).to.equal(expected);
            });

            it('should be Dutch for its codes', function() {
                const expected = 'Dutch';

                expect(getLabel('nl')).to.equal(expected);
            });

            it('should be French for its codes', function() {
                const expected = 'French';

                expect(getLabel('fr')).to.equal(expected);
            });

            it('should be German for its codes', function() {
                const expected = 'German';

                expect(getLabel('de')).to.equal(expected);
            });

            it('should be Japanese for its codes', function() {
                const expected = 'Japanese';

                expect(getLabel('ja')).to.equal(expected);
            });

            it('should be Portuguese for its codes', function() {
                const expected = 'Portuguese';

                expect(getLabel('pt')).to.equal(expected);
            });

            it('should be Italian for its codes', function() {
                const expected = 'Italian';

                expect(getLabel('it')).to.equal(expected);
            });

            it('should be Russian for its codes', function() {
                const expected = 'Russian';

                expect(getLabel('ru')).to.equal(expected);
            });

            it('should be Spanish for its codes', function() {
                const expected = 'Spanish';

                expect(getLabel('es')).to.equal(expected);
            });

            it('should map based only on the first two characters', function() {
                const expected = 'Portuguese';
                expect(getLabel('pt-br')).to.equal(expected);
            });
        });

        describe('getLabel from ISO 639-2 codes', function() {

            it('should not change for its English codes', function() {
                expect(getLabel('eng')).to.equal('eng');
            });

            it('should not change for its Chinese codes', function() {
                expect(getLabel('zho')).to.equal('zho');
                expect(getLabel('chi')).to.equal('chi');
            });

            it('should not change for its Dutch codes', function() {
                expect(getLabel('nld')).to.equal('nld');
                expect(getLabel('dut')).to.equal('dut');
            });

            it('should not change for its French codes', function() {
                expect(getLabel('fra')).to.equal('fra');
                expect(getLabel('fre')).to.equal('fre');
            });

            it('should not change for its Herman codes', function() {
                expect(getLabel('deu')).to.equal('deu');
                expect(getLabel('ger')).to.equal('ger');
            });

            it('should not change for its Japanese codes', function() {
                expect(getLabel('jpn')).to.equal('jpn');
            });

            it('should not change for its Portuguese codes', function() {
                expect(getLabel('por')).to.equal('por');
            });

            it('should not change for its Italian codes', function() {
                expect(getLabel('ita')).to.equal('ita');
            });

            it('should not change for its Russian codes', function() {
                expect(getLabel('rus')).to.equal('rus');
            });

            it('should not change for its Spanish codes', function() {
                expect(getLabel('esp')).to.equal('esp');
                expect(getLabel('spa')).to.equal('spa');
            });
        });

        describe('getCode from ISO 639-1 codes', function() {

            it('should be English for its codes', function() {
                expect(getCode('English')).to.equal('en');
            });

            it('should be Chinese for its codes', function() {
                expect(getCode('Chinese')).to.equal('zh');
            });

            it('should be Dutch for its codes', function() {
                expect(getCode('Dutch')).to.equal('nl');
            });

            it('should be French for its codes', function() {
                expect(getCode('French')).to.equal('fr');
            });

            it('should be German for its codes', function() {
                expect(getCode('German')).to.equal('de');
            });

            it('should be Japanese for its codes', function() {
                expect(getCode('Japanese')).to.equal('ja');
            });

            it('should be Portuguese for its codes', function() {
                expect(getCode('Portuguese')).to.equal('pt');
            });

            it('should be Italian for its codes', function() {
                expect(getCode('Italian')).to.equal('it');
            });

            it('should be Russian for its codes', function() {
                expect(getCode('Russian')).to.equal('ru');
            });

            it('should be Spanish for its codes', function() {
                expect(getCode('Spanish')).to.equal('es');
            });

            it('should be Greek for its codes', function() {
                expect(getCode('Greek')).to.equal('el');
            });
        });
    });

    describe('getPlayerLanguage', () => {
        let sandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        function nullifyNavigatorProperty(property) {
            if (navigator[property]) {
                sandbox.stub(navigator, property).value(null);
            }
        }

        function stubNavigatorProperty(property, value) {
            if (navigator[property]) {
                sandbox.stub(navigator, property).value(value);
            } else {
                navigator[property] = value;
            }
        }

        function stubHtmlLanguage(value) {
            const htmlTag = document.querySelector('html');
            sandbox.stub(htmlTag, 'getAttribute').withArgs('lang').returns(value);
        }

        it('should return the htlm lang attribute', () => {
            const htmlLanguage = 'htmlLanguage';
            stubHtmlLanguage(htmlLanguage);
            expect(getPlayerLanguage()).to.equal(htmlLanguage);
        });

        it('should fallback to navigator.language when html lang attribute is absent', () => {
            const language = 'language';
            stubHtmlLanguage(null);
            stubNavigatorProperty('language', language);
            expect(getPlayerLanguage()).to.equal(language);
        });

        it('should fallback to navigator.browserLanguage when navigator.language is undefined', () => {
            const browserLanguage = 'browserLanguage';
            stubHtmlLanguage(null);
            nullifyNavigatorProperty('language');
            stubNavigatorProperty('browserLanguage', browserLanguage);
            expect(getPlayerLanguage()).to.equal(browserLanguage);

        });

        it('should fallback to navigator.userLanguage when navigator.browserLanguage is undefined', () => {
            const userLanguage = 'userLanguage';
            stubHtmlLanguage(null);
            nullifyNavigatorProperty('language');
            nullifyNavigatorProperty('browserLanguage');
            stubNavigatorProperty('userLanguage', userLanguage);
            expect(getPlayerLanguage()).to.equal(userLanguage);
        });

        it('should fallback to navigator.systemLanguage when navigator.userLanguage is undefined', () => {
            const systemLanguage = 'systemLanguage';
            stubHtmlLanguage(null);
            nullifyNavigatorProperty('language');
            nullifyNavigatorProperty('browserLanguage');
            nullifyNavigatorProperty('userLanguage');
            stubNavigatorProperty('systemLanguage', systemLanguage);
            expect(getPlayerLanguage()).to.equal(systemLanguage);
        });
    });
});

