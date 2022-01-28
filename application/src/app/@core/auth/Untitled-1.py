# you can write to stdout for debugging purposes, e.g.
def microsoftQuestion():
    print("This is a debug message")
    products = [10, 70, 35, 20, 60, 90, 60]
    amount = 100
    begin = 0
    end = len(products)
    my_dict = {}
    for x in range(0, len(products)):
        my_dict[x] = products[x]
    result = [-1, -1]
    while begin != end:
        tmpSum = products[begin] + products[end]
        if tmpSum > amount: end -= 1
        elif tmpSum < amount: begin += 1
        elif tmpSum == amount:
            result = [my_dict.get(begin), my_dict.get(end)]
            break
    print(result)
    return result

print(microsoftQuestion)