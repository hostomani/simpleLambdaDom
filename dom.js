function camelToDash(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export class Document {
    constructor(){
        this.element = new Element('document', {})
        return this
    }
    createElement(tagName, attributes={}){
        const element = new Element(tagName, attributes)
        return element
    }
}

export class Element {
    constructor(tagName, attributes={}){
        this.attributes = attributes
        this.tagName = tagName
        this.innerHTML = ''
        if(this.attributes.innerHTML){
            this.innerHTML = this.attributes.innerHTML
        }
        this.htmlAttributes = ''
        for(const [attributeName, attributeValue] of Object.entries(this.attributes)){
            if(attributeName != 'style' && attributeName != 'innerHTML'){
                this.htmlAttributes += camelToDash(attributeName) + '=' + attributeValue + ' '
            }
        }
        this.style = ''
        if(this.attributes.style){
            Object.entries(this.attributes.style).forEach(attribute=> this.style += camelToDash(attribute[0]) + ':' + attribute[1] + ';');
        }
        this.element = `<${this.tagName} ${this.htmlAttributes} style=${this.style}>${this.innerHTML}</${this.tagName}>`
        return this
    }
    append(element){
        this.htmlAttributes = ''
        this.innerHTML += element
        for(const [attributeName, attributeValue] of Object.entries(this.attributes)){
            if(attributeName != 'style' && attributeName != 'innerHTML'){
                this.htmlAttributes += camelToDash(attributeName) + '=' + attributeValue + ' '
            }
        }
        this.element = `<${this.tagName} ${this.htmlAttributes} style=${this.style}>${this.innerHTML}</${this.tagName}>`
        return this
    }
}
