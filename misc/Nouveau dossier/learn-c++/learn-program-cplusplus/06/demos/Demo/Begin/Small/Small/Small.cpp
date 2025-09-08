#include <iostream>
using std::cout;
using std::cin;

#include <string>
using std::string;

int main()
{
    string name;
    cout << "who are you? ";
    cin >> name;
    string greeting = "Hello, " + name;
    if (name == "Kate")
    {
        greeting += ", I know you!";
    }
    cout << greeting << '\n';
    return 0;
}

