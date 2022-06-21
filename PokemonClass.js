
class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = '무속성';
        this.skill = ['삐지기', '도망가기', '지침', '잠자기'];
    }

    static createPokemon(name, type) { // 타입마다 다른 포켓몬을 생성해야하므로 팩토리패턴을 이용해주었다
        if(type == '물') {
            return new WaterPokemon(name)
        }
        else if(type == '불') {
            return new FirePokemon(name);
        }
        else if(type == '풀') {
            return new GrassPokemon(name);
        }
        else if(type == '전기') {
            return new ElectricPokemon(name);
        }
    }

    who() {
        console.log(this.name + '는 ' + this.type + '타입이고 [' + this.skill + '] 스킬을 사용할 수 있습니다.');
    }

    포켓볼에서나오다() {
        console.log(this.name + '가 포켓볼에서 나왔습니다.');
    }

    포켓볼에들어가다() {
        console.log(this.name + '가 포켓볼에 들어갔습니다.');
    }
}

// 진화의돌을 만들기위해 반드시 진화의초석이 필요하고 이곳에 여러 기운들을 넣어 원하는 진화의돌을 만들 수 있게 Decorator패턴을 이용해보았습니다
// 진화의돌을 만들기위해 반드시 필요한 진화의초석
class EvolutionCornerStone {
    getCost() {
        return 1.0;
    }

    getIngredients() {
        return '진화의초석';
    }
}

class EvolutionIngredient extends EvolutionCornerStone { // 진화의 재료를 가지고 진화의초석에 추가해줄 수 있다
    constructor(evolutionCornerStone) {
        super();
        this.evolutionCornerStone = evolutionCornerStone;
    }

    getCost() {
        return this.evolutionCornerStone.getCost();
    }

    getIngredients() {
        return this.evolutionCornerStone.getIngredients();
    }

    toString() {
        return 'Cost : ' + this.getCost() + '\nIngredients : ' + this.getIngredients();
    }
} 

class StrengthOfFlame extends EvolutionIngredient {
    getCost() {
        return super.getCost() + 0.5;
    }

    getIngredients() {
        return super.getIngredients() + ', 불꽃의기운';
    }
}

class StrengthOfThunder extends EvolutionIngredient {
    getCost() {
        return super.getCost() + 1.2;
    }

    getIngredients() {
        return super.getIngredients() + ', 천둥의기운';
    }
}

class StrengthOfWater extends EvolutionIngredient {
    getCost() {
        return super.getCost() + 2.3;
    }

    getIngredients() {
        return super.getIngredients() + ', 물의기운';
    }
}

class StrengthOfGrass extends EvolutionIngredient {
    getCost() {
        return super.getCost() + 3.0;
    }

    getIngredients() {
        return super.getIngredients() + ', 풀의기운';
    }
}

class ElectricPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['백만볼트', '번개후리기', '전광석화', '천만볼트'];
        this.type = '전기';
    }
}

class FirePokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['불 갈기기', '화염방사', '회오리불꽃', '베어가르기'];
        this.type = '불';
    }
}

class WaterPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['몸통 박치기', '물대포', '냉동빔', '거품광선'];
        this.type = '물';
    }
}

class GrassPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['씨뿌리기', '덩굴채찍', '울음소리', '몸통 박치기'];
        this.type = '풀';
    }
}

class 팔운동 {
    constructor(pokemon) {
        this.name = pokemon.name;
    }

    이두컬하기() {
        console.log(this.name + '가 이두컬을 합니다.');
    }
}

class 하체운동 {
    constructor(pokemon) {
        this.name = pokemon.name;
    }

    스쿼트하기() {
        console.log(this.name + '가 스쿼트를 합니다.');
    }
}

class 어깨운동 {
    constructor(pokemon) {
        this.name = pokemon.name;
    }

    숄더프레스하기() {
        console.log(this.name + '가 숄더프레스를 합니다.');
    }
}

class 가슴운동 {
    constructor(pokemon) {
        this.name = pokemon.name;
    }

    벤치프레스하기() {
        console.log(this.name + '가 벤치프레스를 합니다.');
    }
}

class 등운동 {
    constructor(pokemon) {
        this.name = pokemon.name;
    }

    턱걸이() {
        console.log(this.name + '가 턱걸이를 합니다.');
    }
}

class 개인훈련장 {
    constructor(pokemon) {
      this.pokemon = pokemon;
      this.팔운동 = new 팔운동(pokemon);
      this.하체운동 = new 하체운동(pokemon);
      this.가슴운동 = new 가슴운동(pokemon);
      this.등운동 = new 등운동(pokemon);
      this.어깨운동 = new 어깨운동(pokemon);
    }

    정신력강화하기() {
        console.log('정신력 강화중…——————————');
        this.pokemon.포켓볼에서나오다();
        this.하체운동.스쿼트하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }

    스트렝스훈련하기() {
        console.log('스트렝스 강화중…——————————');
        this.pokemon.포켓볼에서나오다();
        this.팔운동.이두컬하기();
        this.하체운동.스쿼트하기();
        this.등운동.턱걸이();
        this.pokemon.포켓볼에들어가다();
    }

    스킬강화하기() {
        console.log('스킬 강화중…———————————');
        this.pokemon.포켓볼에서나오다();
        this.어깨운동.숄더프레스하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }
}

// 템플릿 패턴
class Evolution {
    constructor (pokemon) {
        this.pokemon = pokemon;
        this.진화하다 = function() {
        this.정신집중하다();
        this.진화의돌을사용하다();
        this.궁극체포켓몬으로변하다();
        }
    
        this.정신집중하다 = function() {
            console.log('[' + this.pokemon.name + ']가 정신을 집중하는중입니다.');
        }

        this.진화의돌을사용하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [진화의 돌]을 사용합니다.');
        }

        this.궁극체포켓몬으로변하다 = function() {
            console.log('[' + this.pokemon.name + ']가 궁극체포켓몬으로 변합니다.');
        }
    }
}

class FireEvolution extends Evolution{
    constructor (pokemon) {
        super(pokemon);
        this.pokemon = pokemon;
        this.진화의돌을사용하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [불꽃의 돌]을 사용합니다.');
        }

        this.궁극체포켓몬으로변하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [리자몽]으로 진화합니다.');
        }
    }
}

class WaterEvolution extends Evolution{
    constructor (pokemon) {
        super(pokemon);
        this.pokemon = pokemon;
        this.진화의돌을사용하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [물의 돌]을 사용합니다.');
        }
    
        this.궁극체포켓몬으로변하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [거북왕]으로 진화합니다.');
        }
    }
}

class GrassEvolution extends Evolution{
    constructor (pokemon) {
        super(pokemon);
        this.pokemon = pokemon;
        this.진화의돌을사용하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [풀의 돌]을 사용합니다.');
        }

        this.궁극체포켓몬으로변하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [이상해꽃]으로 진화합니다.');
        }
    }
}

class ElectricEvolution extends Evolution{
    constructor (pokemon) {
        super(pokemon);
        this.pokemon = pokemon;
        this.진화의돌을사용하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [천둥의 돌]을 사용합니다.');
        }

        this.궁극체포켓몬으로변하다 = function() {
            console.log('[' + this.pokemon.name + ']가 [라이츄]으로 진화합니다.');
        }
    }
}
