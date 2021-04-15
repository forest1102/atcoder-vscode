#pragma region
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;
#define FOR(i, l, r) for(size_t i = (l); i < (r); ++i)
#define rep(i, n) for(int i = 0; i < (int)(n); i++)
#define rrep(i, n) for(int i = (n)-1; i >= 0; --i)
#define ull unsigned long long
#define ll long long
#define ul unsigned long
template < class T > using vec2d = vector< vector< T > >;
#pragma endregion

int main() {
    ull N;
    cin >> N;
    ull l = 1;
    FOR(i, 1, N + 1) { l = lcm(l, i); }
    cout << l + 1 << endl;
    return 0;
}