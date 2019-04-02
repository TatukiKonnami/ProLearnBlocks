class Token{
    constructor(){
        this.kind = ""
        this.value = ""
    }

    set(kind, value){
        this.kind = kind
        this.value = value
    }
    toSting() {
        return this.kind + " / " + this.value;
    }
}

class Lexer{
    constructor(text){
        this.text = text
        this.i = 0
    }

    // check this charactor is  End of file 
    isEOF(){
        return this.text.length <= this.i
    }

    // get check node 
    charactor(){
        if(this.isEOF()){
            console.log("No more charactor")
        }
        return this.text[this.i]
    }

    // check node change next charactor  
    next(){
        var c = this.charactor()
        this.i = this.i + 1
        return c
    }

    // WhiteSpace check and ignore
    skipWhiteSpace(){
        while(!this.isEOF() &&  this.charactor() == " "){
            this.next()
        }
    }

    // check operator
    isSignStart(c){
        return c == "=" || c == "+" || c == "*" || c == "/"
    }

    // check number 
    isDIgitStart(c){
        return !isNaN(c)
    }

    // check Alphabet
    isVariableStart(c){
        var reg = /[A-Za-z]/
        return reg.test(c)
    }

    // operator
    sign(){
        var t = new Token()
        t.set("sign", this.next())
        return t
    }

    // number
    digit(){
        var b = this.next()
        while(!this.isEOF() && !isNaN(this.charactor())){
            b = b + this.next()
        }
        var t = new Token()
        t.set("digit", b)
        return t
    }

    // var
    variable(){
        var b = this.next()
        var reg = /[A-Za-z]/
        while(!this.isEOF() && (!isNaN(this.charactor()) || reg.test(this.charactor())) ) {
            b = b + this.next()
        }
        var t = new Token()
        t.set("variable", b)
        return t
    }

    nextToken(){
        this.skipWhiteSpace()
        if(this.isEOF()){
            return NaN
        } else if(this.isSignStart(this.charactor())) {
            return this.sign()
        } else if(this.isDIgitStart(this.charactor())) {
            return this.digit()
        } else if(this.isVariableStart(this.charactor())) {
            return this.variable()
        } else {
            console.log("not match token")
        }
    }

    tokenize(){
        var tokens = []
        var t = this.nextToken()
        while(t != NaN) {
            tokens.push(t)
            t = this.nextToken()
        }
        return tokens
    }
}


var l = new Lexer("a = 10 b = 1 * 2  / 3 ")
var tokens = [] 
tokens = l.tokenize()
for(t in tokens){
    console.log(t.toSting())
}




