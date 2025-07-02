// Trie data structure for efficient product search
class TrieNode {
  children: Map<string, TrieNode>
  isEndOfWord: boolean
  productIds: Set<string>

  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
    this.productIds = new Set()
  }
}

class ProductSearchTrie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string, productId: string) {
    let current = this.root
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char)!
      current.productIds.add(productId)
    }
    
    current.isEndOfWord = true
  }

  search(prefix: string): Set<string> {
    let current = this.root
    
    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) {
        return new Set()
      }
      current = current.children.get(char)!
    }
    
    return current.productIds
  }

  buildFromProducts(products: Array<{ _id: string; title: string; description: string; tags: string[] }>) {
    this.root = new TrieNode()
    
    for (const product of products) {
      // Index title words
      const titleWords = product.title.toLowerCase().split(/\s+/)
      for (const word of titleWords) {
        this.insert(word, product._id)
      }
      
      // Index description words
      const descWords = product.description.toLowerCase().split(/\s+/)
      for (const word of descWords) {
        this.insert(word, product._id)
      }
      
      // Index tags
      for (const tag of product.tags) {
        this.insert(tag, product._id)
      }
    }
  }
}

export const productSearchTrie = new ProductSearchTrie()