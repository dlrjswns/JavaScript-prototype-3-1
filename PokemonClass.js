function createPokemon (name, type) { // 타입마다 다른 포켓몬을 생성해야하므로 팩토리패턴을 이용해주었다
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

class Pokemon {
    constructor(name) {
        this.name = name;
        this.type = '무속성';
        this.skill = ['삐지기', '도망가기', '지침', '잠자기'];
        this.cost = function() {
            return 0;
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

class 불꽃의돌 {
    constructor(pokemon) {
        var cost = pokemon.cost();
        pokemon.cost = function() {
            console.log(pokemon.name + '가 불꽃의 돌을 구매하였습니다.');
            return cost + 100;
        }
    }
}

class 물의돌 {
    constructor(pokemon) {
        var cost = pokemon.cost();
        pokemon.cost = function() {
            console.log(pokemon.name + '가 물의 돌을 구매하였습니다.');
            return cost + 100;
        }
    }
}

class 천둥의돌 {
    constructor(pokemon) {
        var cost = pokemon.cost();
        pokemon.cost = function() {
            console.log(pokemon.name + '가 천둥의 돌을 구매하였습니다.');
            return cost + 100;
        }    
    }
}

class ElectricPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['백만볼트', '번개후리기', '전광석화', '천만볼트'];
        this.type = '전기';
        this.cost = function() {
            return 100;
        }
    }
}

class FirePokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['불 갈기기', '화염방사', '회오리불꽃', '베어가르기'];
        this.type = '불';
        this.cost = function() {
            return 200;
        }
    }
}

class WaterPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['몸통 박치기', '물대포', '냉동빔', '거품광선'];
        this.type = '물';
        this.cost = function() {
            return 300;
        }
    }
}

class GrassPokemon extends Pokemon {
    constructor(name) {
        super(name);
        this.name = name;
        this.skill = ['씨뿌리기', '덩굴채찍', '울음소리', '몸통 박치기'];
        this.type = '풀';
        this.cost = function() {
            return 400;
        }
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

const 이건준 = new Pokemon('이건준');
const 이상해씨 = createPokemon('이상해씨', '풀');
const 파이리 = createPokemon('파이리', '불');
const 꼬부기 = createPokemon('꼬부기', '물');

  console.log('————————훈련장————————');
  const 금빛체육관 = new 개인훈련장(이상해씨);
  금빛체육관.정신력강화하기();
  금빛체육관.스트렝스훈련하기();
  금빛체육관.스킬강화하기();
  
  
  console.log('———————포켓몬 정보———————');
  이상해씨.who();
  파이리.who();
  꼬부기.who();
  console.log('——————————————————');


new 불꽃의돌(파이리);
new 물의돌(파이리);
new 천둥의돌(파이리);
console.log('구매한 총 가격: ' + 파이리.cost()+' Gold');